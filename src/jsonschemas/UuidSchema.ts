/* eslint-disable */
// This is a generated file, do not modify
import { UuidSchema } from '../schemas/UuidSchema';
import { getValidatorFunction } from '../utils';
import validate from './UuidSchemaValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/UuidSchema';

export const GeneratedUuidSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/UuidSchema",
  "definitions": {
    "UuidSchema": {
      "type": "string",
      "format": "uuid"
    }
  }
};

export const validateUuidSchema = getValidatorFunction<UuidSchema>(validate as ValidateFunction);
