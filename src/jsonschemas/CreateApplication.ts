/* eslint-disable */
// This is a generated file, do not modify
import { CreateApplication } from '../schemas/CreateApplication';
import { getValidatorFunction } from '../utils';
import validate from './CreateApplicationValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/CreateApplication';

export const GeneratedCreateApplication = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/CreateApplication",
  "definitions": {
    "CreateApplication": {
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
        "organizationId": {
          "type": "string"
        },
        "color": {
          "type": "string"
        },
        "icon": {
          "type": "string"
        },
        "isPublic": {
          "type": "boolean"
        },
        "folderId": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "organizationId",
        "color",
        "icon"
      ],
      "additionalProperties": false
    }
  }
};

export const validateCreateApplication = getValidatorFunction<CreateApplication>(validate as ValidateFunction);
