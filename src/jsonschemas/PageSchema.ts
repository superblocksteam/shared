/* eslint-disable */
// This is a generated file, do not modify
import { PageSchema } from '../schemas/PageSchema';
import { getValidatorFunction } from '../utils';
import validate from './PageSchemaValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/PageSchema';

export const GeneratedPageSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/PageSchema",
  "definitions": {
    "PageSchema": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "applicationId": {
          "type": "string"
        },
        "deletedAt": {
          "type": "string"
        },
        "isHidden": {
          "type": "boolean"
        },
        "layouts": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Layout"
          }
        },
        "updated": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "name",
        "applicationId",
        "isHidden",
        "layouts",
        "updated"
      ],
      "additionalProperties": false
    },
    "Layout": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "dsl": {
          "$ref": "#/definitions/PageDSL"
        },
        "updated": {
          "type": "string"
        },
        "actionUpdates": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": {}
          }
        },
        "layoutOnLoadActions": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": {}
          }
        },
        "messages": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": {}
          }
        },
        "userPermissions": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": {}
          }
        }
      },
      "required": [
        "id",
        "dsl",
        "updated",
        "actionUpdates",
        "layoutOnLoadActions",
        "messages",
        "userPermissions"
      ],
      "additionalProperties": false
    },
    "PageDSL": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "widgetId": {
          "type": "string"
        },
        "children": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/interface-123644396-0-409-123644396-0-767"
          }
        },
        "leftColumn": {
          "type": "number"
        },
        "rightColumn": {
          "type": "number"
        },
        "topRow": {
          "type": "number"
        },
        "bottomRow": {
          "type": "number"
        },
        "snapColumns": {
          "type": "number"
        },
        "snapRows": {
          "type": "number"
        },
        "minHeight": {
          "type": "number"
        },
        "detachFromLayout": {
          "type": "boolean"
        },
        "version": {
          "type": "number"
        }
      },
      "required": [
        "bottomRow",
        "topRow",
        "type",
        "version",
        "widgetId"
      ]
    },
    "interface-123644396-0-409-123644396-0-767": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "widgetId": {
          "type": "string"
        },
        "children": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/interface-123644396-0-409-123644396-0-767"
          }
        },
        "leftColumn": {
          "type": "number"
        },
        "rightColumn": {
          "type": "number"
        },
        "topRow": {
          "type": "number"
        },
        "bottomRow": {
          "type": "number"
        },
        "snapColumns": {
          "type": "number"
        },
        "snapRows": {
          "type": "number"
        },
        "minHeight": {
          "type": "number"
        },
        "detachFromLayout": {
          "type": "boolean"
        }
      },
      "required": [
        "type",
        "widgetId",
        "topRow",
        "bottomRow"
      ],
      "additionalProperties": {}
    }
  }
};

export const validatePageSchema = getValidatorFunction<PageSchema>(validate as ValidateFunction);
