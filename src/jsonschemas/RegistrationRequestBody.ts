/* eslint-disable */
// This is a generated file, do not modify
import { RegistrationRequestBody } from '../schemas/RegistrationRequestBody';
import { getValidatorFunction } from '../utils';
import validate from './RegistrationRequestBodyValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/RegistrationRequestBody';

export const GeneratedRegistrationRequestBody = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/RegistrationRequestBody",
  "definitions": {
    "RegistrationRequestBody": {
      "$ref": "#/definitions/PostRegistrationRequestBody"
    },
    "PostRegistrationRequestBody": {
      "type": "object",
      "properties": {
        "pluginVersions": {
          "$ref": "#/definitions/SupportedPluginVersions"
        },
        "type": {
          "$ref": "#/definitions/AgentType"
        }
      },
      "required": [
        "pluginVersions",
        "type"
      ],
      "additionalProperties": false
    },
    "SupportedPluginVersions": {
      "type": "object",
      "additionalProperties": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/SemVer"
        }
      }
    },
    "SemVer": {
      "type": "string"
    },
    "AgentType": {
      "type": "number",
      "enum": [
        0,
        1,
        2
      ]
    }
  }
};

export const validateRegistrationRequestBody = getValidatorFunction<RegistrationRequestBody>(validate as ValidateFunction);
