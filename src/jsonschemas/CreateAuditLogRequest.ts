/* eslint-disable */
// This is a generated file, do not modify
import { CreateAuditLogRequest } from '../schemas/CreateAuditLogRequest';
import { getValidatorFunction } from '../utils';
import validate from './CreateAuditLogRequestValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/CreateAuditLogRequest';

export const GeneratedCreateAuditLogRequest = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/CreateAuditLogRequest",
  "definitions": {
    "CreateAuditLogRequest": {
      "$ref": "#/definitions/PostAuditLogRequestBody"
    },
    "PostAuditLogRequestBody": {
      "$ref": "#/definitions/AuditLogDto"
    },
    "AuditLogDto": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "entityId": {
          "type": "string"
        },
        "entityType": {
          "$ref": "#/definitions/AuditLogEntityType"
        },
        "organizationId": {
          "type": "string"
        },
        "deployed": {
          "type": "boolean"
        },
        "startTime": {
          "type": "string",
          "format": "date-time"
        },
        "endTime": {
          "type": "string",
          "format": "date-time"
        },
        "source": {
          "type": "string"
        },
        "type": {
          "$ref": "#/definitions/AuditLogEventType"
        },
        "details": {
          "$ref": "#/definitions/AuditLogDetails"
        },
        "steps": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/StepDetail"
          }
        },
        "agentId": {
          "type": "string"
        }
      },
      "required": [
        "entityId",
        "entityType",
        "deployed",
        "startTime"
      ],
      "additionalProperties": false
    },
    "AuditLogEntityType": {
      "type": "number",
      "enum": [
        0,
        1,
        2,
        3,
        4
      ]
    },
    "AuditLogEventType": {
      "type": "number",
      "const": 0
    },
    "AuditLogDetails": {
      "type": "object",
      "properties": {
        "type": {
          "$ref": "#/definitions/AuditLogEventType"
        },
        "endTime": {
          "type": "string",
          "format": "date-time"
        }
      },
      "required": [
        "type"
      ],
      "additionalProperties": false
    },
    "StepDetail": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "pluginId": {
          "type": "string"
        },
        "datasourceId": {
          "type": "string"
        },
        "error": {
          "type": "string"
        },
        "startTimeUtc": {
          "type": "string",
          "format": "date-time"
        },
        "executionTimeMs": {
          "type": "number"
        }
      },
      "required": [
        "name",
        "id",
        "pluginId",
        "datasourceId"
      ],
      "additionalProperties": false
    }
  }
};

export const validateCreateAuditLogRequest = getValidatorFunction<CreateAuditLogRequest>(validate as ValidateFunction);
