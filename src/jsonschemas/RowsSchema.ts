/* eslint-disable */
// This is a generated file, do not modify
import { RowsSchema } from '../schemas/RowsSchema';
import { getValidatorFunction } from '../utils';
import validate from './RowsSchemaValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/RowsSchema';

export const GeneratedRowsSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/RowsSchema",
  "definitions": {
    "RowsSchema": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": {}
      }
    }
  }
};

export const validateRowsSchema = getValidatorFunction<RowsSchema>(validate as ValidateFunction);
