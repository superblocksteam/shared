import fs from 'fs';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import standaloneCode from 'ajv/dist/standalone/index.js';
import * as TJS from 'ts-json-schema-generator';

const startTime = performance.now();

const schemaFiles = fs
  .readdirSync('./src/schemas', { withFileTypes: true })
  .filter((item) => !item.isDirectory() && !item.name.includes('index') && item.name.includes(`.ts`))
  .map((item) => item.name);

const schemaNames = schemaFiles.map((name) => name.substring(0, name.indexOf('.')));

// The schema generator uses the typescript compiler, so we need to stub out the jsonschemas first
fs.rmSync('./src/jsonschemas', { recursive: true });
fs.mkdirSync('./src/jsonschemas', { recursive: true });
fs.writeFileSync(
  `./src/jsonschemas/index.ts`,
  `// This is a generated file, do not modify
export default "empty";
`
);

const generator = TJS.createGenerator({
  tsconfig: './tsconfig.json'
});

console.log(`Extracted JSON schemas in ${Math.round(performance.now() - startTime)} ms`);

schemaNames.forEach((name) => {
  const ajv = new Ajv({ coerceTypes: true, allowUnionTypes: true, code: { source: true, esm: true } });
  addFormats(ajv);

  const schema = generator.createSchema(name);
  const compiled = ajv.compile(schema);

  fs.writeFileSync(
    `./src/jsonschemas/${name}Validator.js`,
    `/* eslint-disable */
${standaloneCode(ajv, compiled)}`
  );
  fs.writeFileSync(
    `./src/jsonschemas/${name}.ts`,
    `/* eslint-disable */
// This is a generated file, do not modify
import { ${name} } from '../schemas/${name}';
import { getValidatorFunction } from '../utils';
import validate from './${name}Validator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/${name}';

export const validate${name} = getValidatorFunction<${name}>(validate as ValidateFunction);
`,
    (err) => {
      throw new Error(err);
    }
  );
  fs.writeFileSync(`./src/jsonschemas/${name}.json`, JSON.stringify(schema, null, 2), (err) => {
    throw new Error(err);
  });
});

fs.writeFileSync(
  `./src/jsonschemas/index.ts`,
  `// This is a generated file, do not modify

${schemaNames.map((name) => `export * from './${name}';`).join('\n')}
`
);

console.log(`Finished writing JSON schemas after ${Math.round(performance.now() - startTime)} ms`);
