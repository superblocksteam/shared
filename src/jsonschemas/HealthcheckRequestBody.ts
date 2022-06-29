/* eslint-disable */
// This is a generated file, do not modify
import { HealthcheckRequestBody } from '../schemas/HealthcheckRequestBody';
import { getValidatorFunction } from '../utils';
import validate from './HealthcheckRequestBodyValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/HealthcheckRequestBody';

export const GeneratedHealthcheckRequestBody = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/HealthcheckRequestBody",
  "definitions": {
    "HealthcheckRequestBody": {
      "$ref": "#/definitions/PostHealthcheckRequestBody"
    },
    "PostHealthcheckRequestBody": {
      "$ref": "#/definitions/Metrics"
    },
    "Metrics": {
      "type": "object",
      "properties": {
        "cpu": {
          "anyOf": [
            {
              "$ref": "#/definitions/Systeminformation.CurrentLoadData"
            },
            {
              "type": "number"
            }
          ]
        },
        "memory": {
          "anyOf": [
            {
              "$ref": "#/definitions/Systeminformation.MemData"
            },
            {
              "type": "number"
            }
          ]
        },
        "disk": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Systeminformation.FsSizeData"
          }
        },
        "io": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Systeminformation.NetworkStatsData"
          }
        },
        "uptime": {
          "type": "number"
        },
        "reported_at": {
          "type": "string",
          "format": "date-time"
        },
        "deployed_at": {
          "type": "string",
          "format": "date-time"
        },
        "version": {
          "type": "string"
        },
        "version_external": {
          "type": "string"
        },
        "apiSuccessCount": {
          "type": "number"
        },
        "apiFailureCount": {
          "type": "number"
        },
        "apiP90DurationSeconds": {
          "type": "number"
        },
        "workflowSuccessCount": {
          "type": "number"
        },
        "workflowFailureCount": {
          "type": "number"
        },
        "workflowP90DurationSeconds": {
          "type": "number"
        },
        "desiredState": {
          "$ref": "#/definitions/AgentStatus"
        }
      },
      "additionalProperties": false
    },
    "Systeminformation.CurrentLoadData": {
      "type": "object",
      "properties": {
        "avgLoad": {
          "type": "number"
        },
        "currentLoad": {
          "type": "number"
        },
        "currentLoadUser": {
          "type": "number"
        },
        "currentLoadSystem": {
          "type": "number"
        },
        "currentLoadNice": {
          "type": "number"
        },
        "currentLoadIdle": {
          "type": "number"
        },
        "currentLoadIrq": {
          "type": "number"
        },
        "rawCurrentLoad": {
          "type": "number"
        },
        "rawCurrentLoadUser": {
          "type": "number"
        },
        "rawCurrentLoadSystem": {
          "type": "number"
        },
        "rawCurrentLoadNice": {
          "type": "number"
        },
        "rawCurrentLoadIdle": {
          "type": "number"
        },
        "rawCurrentLoadIrq": {
          "type": "number"
        },
        "cpus": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Systeminformation.CurrentLoadCpuData"
          }
        }
      },
      "required": [
        "avgLoad",
        "currentLoad",
        "currentLoadUser",
        "currentLoadSystem",
        "currentLoadNice",
        "currentLoadIdle",
        "currentLoadIrq",
        "rawCurrentLoad",
        "rawCurrentLoadUser",
        "rawCurrentLoadSystem",
        "rawCurrentLoadNice",
        "rawCurrentLoadIdle",
        "rawCurrentLoadIrq",
        "cpus"
      ],
      "additionalProperties": false
    },
    "Systeminformation.CurrentLoadCpuData": {
      "type": "object",
      "properties": {
        "load": {
          "type": "number"
        },
        "loadUser": {
          "type": "number"
        },
        "loadSystem": {
          "type": "number"
        },
        "loadNice": {
          "type": "number"
        },
        "loadIdle": {
          "type": "number"
        },
        "loadIrq": {
          "type": "number"
        },
        "rawLoad": {
          "type": "number"
        },
        "rawLoadUser": {
          "type": "number"
        },
        "rawLoadSystem": {
          "type": "number"
        },
        "rawLoadNice": {
          "type": "number"
        },
        "rawLoadIdle": {
          "type": "number"
        },
        "rawLoadIrq": {
          "type": "number"
        }
      },
      "required": [
        "load",
        "loadUser",
        "loadSystem",
        "loadNice",
        "loadIdle",
        "loadIrq",
        "rawLoad",
        "rawLoadUser",
        "rawLoadSystem",
        "rawLoadNice",
        "rawLoadIdle",
        "rawLoadIrq"
      ],
      "additionalProperties": false
    },
    "Systeminformation.MemData": {
      "type": "object",
      "properties": {
        "total": {
          "type": "number"
        },
        "free": {
          "type": "number"
        },
        "used": {
          "type": "number"
        },
        "active": {
          "type": "number"
        },
        "available": {
          "type": "number"
        },
        "buffcache": {
          "type": "number"
        },
        "buffers": {
          "type": "number"
        },
        "cached": {
          "type": "number"
        },
        "slab": {
          "type": "number"
        },
        "swaptotal": {
          "type": "number"
        },
        "swapused": {
          "type": "number"
        },
        "swapfree": {
          "type": "number"
        }
      },
      "required": [
        "total",
        "free",
        "used",
        "active",
        "available",
        "buffcache",
        "buffers",
        "cached",
        "slab",
        "swaptotal",
        "swapused",
        "swapfree"
      ],
      "additionalProperties": false
    },
    "Systeminformation.FsSizeData": {
      "type": "object",
      "properties": {
        "fs": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "size": {
          "type": "number"
        },
        "used": {
          "type": "number"
        },
        "available": {
          "type": "number"
        },
        "use": {
          "type": "number"
        },
        "mount": {
          "type": "string"
        }
      },
      "required": [
        "fs",
        "type",
        "size",
        "used",
        "available",
        "use",
        "mount"
      ],
      "additionalProperties": false
    },
    "Systeminformation.NetworkStatsData": {
      "type": "object",
      "properties": {
        "iface": {
          "type": "string"
        },
        "operstate": {
          "type": "string"
        },
        "rx_bytes": {
          "type": "number"
        },
        "rx_dropped": {
          "type": "number"
        },
        "rx_errors": {
          "type": "number"
        },
        "tx_bytes": {
          "type": "number"
        },
        "tx_dropped": {
          "type": "number"
        },
        "tx_errors": {
          "type": "number"
        },
        "rx_sec": {
          "type": "number"
        },
        "tx_sec": {
          "type": "number"
        },
        "ms": {
          "type": "number"
        }
      },
      "required": [
        "iface",
        "operstate",
        "rx_bytes",
        "rx_dropped",
        "rx_errors",
        "tx_bytes",
        "tx_dropped",
        "tx_errors",
        "rx_sec",
        "tx_sec",
        "ms"
      ],
      "additionalProperties": false
    },
    "AgentStatus": {
      "type": "string",
      "enum": [
        "Active",
        "Disconnected",
        "Browser Unreachable",
        "Pending Registration"
      ]
    }
  }
};

export const validateHealthcheckRequestBody = getValidatorFunction<HealthcheckRequestBody>(validate as ValidateFunction);
