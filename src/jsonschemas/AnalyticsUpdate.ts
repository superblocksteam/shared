/* eslint-disable */
// This is a generated file, do not modify
import { AnalyticsUpdate } from '../schemas/AnalyticsUpdate';
import { getValidatorFunction } from '../utils';
import validate from './AnalyticsUpdateValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/AnalyticsUpdate';

export const GeneratedAnalyticsUpdate = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/AnalyticsUpdate",
  "definitions": {
    "AnalyticsUpdate": {
      "$ref": "#/definitions/AnalyticsDto"
    },
    "AnalyticsDto": {
      "type": "object",
      "properties": {
        "checklist": {
          "$ref": "#/definitions/Checklist"
        },
        "recommendedDatasources": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "additionalProperties": false
    },
    "Checklist": {
      "type": "object",
      "properties": {
        "tasks": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/OnboardingTask"
          }
        }
      },
      "required": [
        "tasks"
      ],
      "additionalProperties": false
    },
    "OnboardingTask": {
      "type": "object",
      "properties": {
        "id": {
          "$ref": "#/definitions/TASKS"
        },
        "displayName": {
          "type": "string"
        },
        "viewed": {
          "type": "string",
          "format": "date-time"
        },
        "completed": {
          "type": "string",
          "format": "date-time"
        }
      },
      "required": [
        "id"
      ],
      "additionalProperties": false
    },
    "TASKS": {
      "anyOf": [
        {
          "$ref": "#/definitions/USER_TASKS"
        },
        {
          "$ref": "#/definitions/ORG_TASKS"
        }
      ]
    },
    "USER_TASKS": {
      "type": "string",
      "enum": [
        "COMPLETE_SURVEY",
        "VIEW_DEMO",
        "VIEW_DEMO_VIDEO",
        "DEPLOY_APP",
        "INVITE_TEAMMATE",
        "DEPLOY_WORKFLOW",
        "DEPLOY_SCHEDULED_JOB"
      ]
    },
    "ORG_TASKS": {
      "type": "string",
      "const": "CONNECT_INTEGRATION"
    }
  }
};

export const validateAnalyticsUpdate = getValidatorFunction<AnalyticsUpdate>(validate as ValidateFunction);
