/* eslint-disable */
// This is a generated file, do not modify
import { UpdateAuditLogRequest } from '../schemas/UpdateAuditLogRequest';
import { getValidatorFunction } from '../utils';
import validate from './UpdateAuditLogRequestValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/UpdateAuditLogRequest';

export const GeneratedUpdateAuditLogRequest = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/UpdateAuditLogRequest",
  "definitions": {
    "UpdateAuditLogRequest": {
      "$ref": "#/definitions/PutAuditLogRequestBody"
    },
    "PutAuditLogRequestBody": {
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
          "anyOf": [
            {
              "type": "string",
              "format": "date-time"
            },
            {
              "type": "null"
            }
          ]
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
        },
        "target": {
          "type": "string"
        },
        "locationContext": {
          "$ref": "#/definitions/ApiLocationContext"
        },
        "status": {
          "$ref": "#/definitions/ApiRunStatus"
        },
        "error": {
          "type": "string"
        }
      },
      "required": [
        "type"
      ],
      "additionalProperties": false
    },
    "ApiLocationContext": {
      "type": "object",
      "properties": {
        "applicationId": {
          "type": "string"
        },
        "pageId": {
          "type": "string"
        }
      },
      "required": [
        "applicationId",
        "pageId"
      ],
      "additionalProperties": false
    },
    "ApiRunStatus": {
      "type": "number",
      "enum": [
        0,
        1
      ]
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

export const validateUpdateAuditLogRequest = getValidatorFunction<UpdateAuditLogRequest>(validate as ValidateFunction);
