/* eslint-disable */
// This is a generated file, do not modify
import { LogRequestBody } from '../schemas/LogRequestBody';
import { getValidatorFunction } from '../utils';
import validate from './LogRequestBodyValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/LogRequestBody';

export const GeneratedLogRequestBody = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/LogRequestBody",
  "definitions": {
    "LogRequestBody": {
      "$ref": "#/definitions/PostLogsRequestBody"
    },
    "PostLogsRequestBody": {
      "type": "object",
      "properties": {
        "logs": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/RemoteHttpLog"
          }
        }
      },
      "required": [
        "logs"
      ],
      "additionalProperties": false
    },
    "RemoteHttpLog": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "resourceId": {
          "type": "string"
        },
        "resourceType": {
          "$ref": "#/definitions/EventEntityType"
        },
        "organizationId": {
          "type": "string"
        },
        "correlationId": {
          "type": "string"
        },
        "environment": {
          "type": "string"
        },
        "resourceName": {
          "type": "string"
        },
        "resourceAction": {
          "type": "string"
        },
        "userEmail": {
          "type": "string"
        },
        "error": {
          "type": "string"
        },
        "errorType": {
          "type": "string"
        },
        "controllerId": {
          "type": "string"
        },
        "workerId": {
          "type": "string"
        },
        "parentId": {
          "type": "string"
        },
        "parentName": {
          "type": "string"
        },
        "parentType": {
          "$ref": "#/definitions/EventEntityType"
        },
        "plugin": {
          "type": "string"
        },
        "integragionId": {
          "type": "string"
        },
        "level": {
          "type": "number"
        },
        "time": {
          "type": "number"
        },
        "remote": {
          "type": "boolean"
        },
        "msg": {
          "type": "string"
        }
      },
      "required": [
        "level",
        "msg",
        "organizationId",
        "remote",
        "resourceId",
        "resourceType",
        "time"
      ]
    },
    "EventEntityType": {
      "type": "string",
      "enum": [
        "application",
        "workflow",
        "scheduled_job",
        "datasource",
        "folder",
        "user",
        "organization",
        "api",
        "step",
        "agent",
        "controller",
        "worker",
        "survey",
        "account",
        "billing",
        "observability"
      ]
    }
  }
};

export const validateLogRequestBody = getValidatorFunction<LogRequestBody>(validate as ValidateFunction);
