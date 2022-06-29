/* eslint-disable */
// This is a generated file, do not modify
import { LayoutUpdate } from '../schemas/LayoutUpdate';
import { getValidatorFunction } from '../utils';
import validate from './LayoutUpdateValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/LayoutUpdate';

export const GeneratedLayoutUpdate = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/LayoutUpdate",
  "definitions": {
    "LayoutUpdate": {
      "type": "object",
      "properties": {
        "dsl": {
          "$ref": "#/definitions/PageDSL"
        },
        "lastSuccessfulWrite": {
          "type": "number"
        }
      },
      "required": [
        "dsl",
        "lastSuccessfulWrite"
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

export const validateLayoutUpdate = getValidatorFunction<LayoutUpdate>(validate as ValidateFunction);
