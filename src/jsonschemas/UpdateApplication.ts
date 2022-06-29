/* eslint-disable */
// This is a generated file, do not modify
import { UpdateApplication } from '../schemas/UpdateApplication';
import { getValidatorFunction } from '../utils';
import validate from './UpdateApplicationValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/UpdateApplication';

export const GeneratedUpdateApplication = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/UpdateApplication",
  "definitions": {
    "UpdateApplication": {
      "type": "object",
      "properties": {
        "environment": {
          "type": "string",
          "enum": [
            "staging",
            "production"
          ]
        },
        "name": {
          "type": "string"
        },
        "color": {
          "type": "string"
        },
        "icon": {
          "type": "string"
        },
        "folderId": {
          "type": "string"
        },
        "isPublic": {
          "type": "boolean"
        }
      },
      "additionalProperties": false
    }
  }
};

export const validateUpdateApplication = getValidatorFunction<UpdateApplication>(validate as ValidateFunction);
