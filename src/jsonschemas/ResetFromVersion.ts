/* eslint-disable */
// This is a generated file, do not modify
import { ResetFromVersion } from '../schemas/ResetFromVersion';
import { getValidatorFunction } from '../utils';
import validate from './ResetFromVersionValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/ResetFromVersion';

export const GeneratedResetFromVersion = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/ResetFromVersion",
  "definitions": {
    "ResetFromVersion": {
      "type": "object",
      "properties": {
        "fromVersion": {
          "type": "number"
        },
        "isDeployed": {
          "type": "boolean"
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "fromVersion"
      ],
      "additionalProperties": false
    }
  }
};

export const validateResetFromVersion = getValidatorFunction<ResetFromVersion>(validate as ValidateFunction);
