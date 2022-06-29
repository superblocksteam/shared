import { get, isFunction, isPlainObject } from 'lodash';
import type { LRParser } from '@lezer/lr';
import type { Token, TokenizeOptions } from 'esprima';

export type EvaluationPair = {
  binding: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  range: {
    start: number;
    end: number;
  };
};

export type PythonParser = LRParser;

export const extractJsEvaluationPairsWithTokenizer = (
  jsSnippet: string,
  entitiesToExtract: Set<string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataTree: Record<string, any>,
  tokenize: (input: string, config?: TokenizeOptions) => Token[]
): EvaluationPair[] => {
  let tokens: Token[] = [];
  const ret: EvaluationPair[] = [];
  try {
    tokens = tokenize(jsSnippet, { range: true });
  } catch (e) {
    // Swallow the error and skip tokenization, let the backend vm handle javascript parsing
    return ret;
  }

  let canCapture = true; // set to true when we are capturing the first identifier in a list of a.b.c OR a[b][c]
  for (let i = 0; i < tokens.length; i++) {
    switch (tokens[i].type) {
      case 'Identifier': {
        if (entitiesToExtract.has(tokens[i].value) && canCapture) {
          // We have found the first token to capture the entity path
          ret.push(extractEntity(i, tokens, dataTree));
          canCapture = false;
        }
        break;
      }
      case 'Punctuator': {
        canCapture = !['.', ']'].includes(tokens[i].value);
        break;
      }
      default: {
        canCapture = true;
        break;
      }
    }
  }
  return ret;
};

// TODO: Move test for this into shared.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractEntity = (indexToStart: number, tokens: Array<Token>, dataTree: Record<string, any>): EvaluationPair => {
  const currentPropertyPath: string[] = [];
  let previousToken;
  let done = false; // cant do break out of switch without state variable
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let entity: any;
  for (let j = indexToStart; j < tokens.length; j++) {
    switch (tokens[j].type) {
      case 'Identifier': {
        const val = tokens[j].value;
        // We need to check hasOwnProperty to avoid prototype functions
        // like .map or .trim. This works on all primitives except null or undefined,
        // but we actually don't want this on arrays that have prototype methods
        if (!entity && dataTree[val]) {
          entity = dataTree[val];
          currentPropertyPath.push(val);
        } else if (entity && !Array.isArray(entity) && isPlainObject(entity) && Object.prototype.hasOwnProperty.call(entity, val)) {
          entity = get(entity, val);
          if (isFunction(entity)) {
            // Something like API1.run() or Input1.text.split() can't be extracted, but we will
            // return API or Input1.text in this case
            done = true;
            break;
          }
          currentPropertyPath.push(val);
          if (!entity || Array.isArray(entity)) {
            done = true;
          }
        } else {
          done = true;
        }
        break;
      }
      case 'Punctuator': {
        if (tokens[j].value === '[' && tokens.length > j + 1 && !['Numeric', 'String'].includes(tokens[j + 1].type)) {
          // if we see [ and the next token is not a numeric (array access) or a string (property access), break out
          done = true;
          break;
        }
        if (tokens[j].value === ']' && !!previousToken && !['Numeric', 'String'].includes(previousToken.type)) {
          // if we see ] and the previous token is not a numeric (array access) or a string (property access), break out
          // in this case, we do not want to add an extra ] to resultant property path
          done = true;
          break;
        }
        if (!['.', '[', ']'].includes(tokens[j].value)) {
          // invalid Punctuator
          done = true;
          break;
        }

        currentPropertyPath.push(tokens[j].value);
        break;
      }
      case 'Numeric':
      case 'String': {
        if (entity && !!previousToken && previousToken.type === 'Punctuator' && previousToken.value === '[') {
          // Tokens contain literal quotation marks like Input1["value"], need to remove
          const currentValue = tokens[j].type === 'String' ? tokens[j].value.slice(1, tokens[j].value.length - 1) : tokens[j].value;
          // Property/Array access
          // We need to check hasOwnProperty to avoid prototype functions
          // like .map or .trim. This works on all primitives except null or undefined

          if (isPlainObject(entity) && Object.prototype.hasOwnProperty.call(entity, currentValue)) {
            entity = get(entity, currentValue);
            // Use the quoted string here
            currentPropertyPath.push(tokens[j].value);
            if (entity === null) {
              done = true;
              break;
            }
          } else {
            // Don't leave in an invalid state
            currentPropertyPath.pop();
            done = true;
          }
        } else {
          // invalid numeric/property if it isn't preceded by [
          done = true;
        }
        break;
      }
      default:
        done = true;
        break;
    }

    previousToken = tokens[j];
    if (done) {
      if (currentPropertyPath[currentPropertyPath.length - 1] === '.') {
        // Special case to handle null.length, such as Input1.value.length
        currentPropertyPath.pop();
      }
      break;
    }
  }
  return {
    binding: currentPropertyPath.join(''),
    value: entity,
    range: {
      // @ts-ignore: range is added to token as a result of tokenization config
      start: tokens[indexToStart].range[0],
      // @ts-ignore: range is added to token as a result of tokenization config
      end: previousToken.range[1]
    }
  };
};

export const extractPythonEvaluationPairs = (
  code: string,
  entities: Set<string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataTree: Record<string, any>,
  parser: PythonParser
): EvaluationPair[] => {
  // Parsing always succeeds, but does not imply that the grammar is valid.
  // Invalid tokens use the type ⚠, but does not affect the entity extraction
  const tree = parser.parse(code);
  const cursor = tree.cursor();
  let isCapturing = false;
  const bindingPairs: EvaluationPair[] = [];
  let currentEntityPath: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let entity: any;
  let bindingStart = 0;
  let bindingEnd = 0;
  do {
    switch (cursor.name) {
      case 'VariableName': {
        const text = code.substring(cursor.from, cursor.to);
        if (!isCapturing && entities.has(text)) {
          if (entity) {
            // We need to check hasOwnProperty to avoid prototype functions
            // like .map or .trim. This works on all primitives except null or undefined
            if (Object.prototype.hasOwnProperty.call(entity, text)) {
              entity = get(entity, text);
              currentEntityPath.push(text);
              if (entity === null) {
                break;
              }
            } else {
              if (currentEntityPath[currentEntityPath.length - 1] === '.') {
                // Don't leave a trailing period if the entity is already done
                currentEntityPath.pop();
              }
              isCapturing = false;
            }
          } else if (!entity) {
            if (dataTree[text]) {
              entity = dataTree[text];
              currentEntityPath.push(text);
              bindingStart = cursor.from;
              isCapturing = true;
            }
          }
        }

        break;
      }
      case 'PropertyName': {
        if (isCapturing) {
          const text = code.substring(cursor.from, cursor.to);
          if (entity && Object.prototype.hasOwnProperty.call(entity, text)) {
            entity = get(entity, text);
            currentEntityPath.push(text);
            if (entity === null) {
              bindingEnd = cursor.to;
              bindingPairs.push({
                binding: currentEntityPath.join(''),
                value: entity,
                range: {
                  start: bindingStart,
                  end: bindingEnd
                }
              });
              currentEntityPath = [];
              entity = undefined;
              isCapturing = false;
              break;
            }
          } else {
            if (currentEntityPath[currentEntityPath.length - 1] === '.') {
              // Don't leave a trailing period if the entity is already done
              currentEntityPath.pop();
            }
            bindingPairs.push({
              binding: currentEntityPath.join(''),
              value: entity,
              range: {
                start: bindingStart,
                end: bindingEnd
              }
            });
            currentEntityPath = [];
            entity = undefined;
            isCapturing = false;
          }
        }
        break;
      }
      case '.': {
        if (isCapturing) {
          currentEntityPath.push(cursor.name);
        }
        break;
      }
      default: {
        if (isCapturing) {
          bindingEnd = cursor.to;
          bindingPairs.push({
            binding: currentEntityPath.join(''),
            value: entity,
            range: {
              start: bindingStart,
              end: bindingEnd
            }
          });
          currentEntityPath = [];
          entity = undefined;
          isCapturing = false;
        }
        break;
      }
    }
  } while (cursor.next());

  if (isCapturing) {
    bindingEnd = cursor.to;
    bindingPairs.push({
      binding: currentEntityPath.join(''),
      value: entity,
      range: {
        start: bindingStart,
        end: bindingEnd
      }
    });
    entity = undefined;
    isCapturing = false;
  }

  return bindingPairs;
};
