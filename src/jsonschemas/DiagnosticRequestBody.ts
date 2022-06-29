/* eslint-disable */
// This is a generated file, do not modify
import { DiagnosticRequestBody } from '../schemas/DiagnosticRequestBody';
import { getValidatorFunction } from '../utils';
import validate from './DiagnosticRequestBodyValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/DiagnosticRequestBody';

export const GeneratedDiagnosticRequestBody = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/DiagnosticRequestBody",
  "definitions": {
    "DiagnosticRequestBody": {
      "$ref": "#/definitions/PostDiagnosticRequestBody"
    },
    "PostDiagnosticRequestBody": {
      "$ref": "#/definitions/DiagnosticMetadata"
    },
    "DiagnosticMetadata": {
      "type": "object",
      "properties": {
        "pluginId": {
          "type": "string"
        },
        "actionName": {
          "type": "string"
        },
        "actionId": {
          "type": "string"
        },
        "applicationId": {
          "type": "string"
        },
        "datasourceId": {
          "type": "string"
        },
        "apiId": {
          "type": "string"
        },
        "environment": {
          "type": "string"
        },
        "messageType": {
          "$ref": "#/definitions/AgentMessageType"
        },
        "message": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "additionalProperties": false
    },
    "AgentMessageType": {
      "type": "string",
      "enum": [
        "integrationError",
        "internalError",
        "unauthorizedError",
        "uncategorizedError"
      ]
    }
  }
};

export const validateDiagnosticRequestBody = getValidatorFunction<DiagnosticRequestBody>(validate as ValidateFunction);
