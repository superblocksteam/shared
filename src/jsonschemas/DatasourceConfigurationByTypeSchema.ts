/* eslint-disable */
// This is a generated file, do not modify
import { DatasourceConfigurationByTypeSchema } from '../schemas/DatasourceConfigurationByTypeSchema';
import { getValidatorFunction } from '../utils';
import validate from './DatasourceConfigurationByTypeSchemaValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/DatasourceConfigurationByTypeSchema';

export const GeneratedDatasourceConfigurationByTypeSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$ref": "#/definitions/DatasourceConfigurationByTypeSchema",
  "definitions": {
    "DatasourceConfigurationByTypeSchema": {
      "$ref": "#/definitions/DatasourceConfigurationByType"
    },
    "DatasourceConfigurationByType": {
      "type": "object",
      "properties": {
        "bigquery": {
          "$ref": "#/definitions/BigqueryDatasourceConfiguration"
        },
        "dynamodb": {
          "$ref": "#/definitions/DynamoDBDatasourceConfiguration"
        },
        "email": {
          "$ref": "#/definitions/EmailDatasourceConfiguration"
        },
        "graphql": {
          "$ref": "#/definitions/GraphQLDatasourceConfiguration"
        },
        "javascript": {
          "$ref": "#/definitions/JavascriptDatasourceConfiguration"
        },
        "mariadb": {
          "$ref": "#/definitions/MariaDBDatasourceConfiguration"
        },
        "mongodb": {
          "$ref": "#/definitions/MongoDBDatasourceConfiguration"
        },
        "mysql": {
          "$ref": "#/definitions/MySQLDatasourceConfiguration"
        },
        "postgres": {
          "$ref": "#/definitions/PostgresDatasourceConfiguration"
        },
        "python": {
          "$ref": "#/definitions/PythonDatasourceConfiguration"
        },
        "redshift": {
          "$ref": "#/definitions/RedshiftDatasourceConfiguration"
        },
        "restapi": {
          "$ref": "#/definitions/RestApiDatasourceConfiguration"
        },
        "restapiintegration": {
          "$ref": "#/definitions/RestApiIntegrationDatasourceConfiguration"
        },
        "s3": {
          "$ref": "#/definitions/S3DatasourceConfiguration"
        },
        "snowflake": {
          "$ref": "#/definitions/SnowflakeDatasourceConfiguration"
        },
        "workflow": {
          "$ref": "#/definitions/WorkflowDatasourceConfiguration"
        },
        "mssql": {
          "$ref": "#/definitions/MsSqlDatasourceConfiguration"
        },
        "rockset": {
          "$ref": "#/definitions/RocksetDatasourceConfiguration"
        },
        "gsheets": {
          "$ref": "#/definitions/GoogleSheetsDatasourceConfiguration"
        }
      },
      "additionalProperties": false
    },
    "BigqueryDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "authentication": {
          "type": "object",
          "properties": {
            "custom": {
              "type": "object",
              "properties": {
                "googleServiceAccount": {
                  "$ref": "#/definitions/Property"
                }
              },
              "additionalProperties": false
            }
          },
          "additionalProperties": false
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    },
    "Property": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "value": {
          "type": "string"
        },
        "editable": {
          "type": "boolean"
        },
        "internal": {
          "type": "boolean"
        },
        "description": {
          "type": "string"
        },
        "mandatory": {
          "type": "boolean"
        },
        "type": {
          "type": "string"
        },
        "defaultValue": {
          "type": "string"
        },
        "minRange": {
          "type": "string"
        },
        "maxRange": {
          "type": "string"
        },
        "valueOptions": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "additionalProperties": false
    },
    "PluginVersionMetadata": {
      "type": "object",
      "properties": {
        "pluginVersion": {
          "$ref": "#/definitions/SemVer"
        }
      },
      "additionalProperties": false
    },
    "SemVer": {
      "type": "string"
    },
    "DynamoDBDatasourceConfiguration": {
      "$ref": "#/definitions/AWSDatasourceConfiguration"
    },
    "AWSDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "authentication": {
          "type": "object",
          "properties": {
            "custom": {
              "type": "object",
              "properties": {
                "region": {
                  "$ref": "#/definitions/Property"
                },
                "accessKeyID": {
                  "$ref": "#/definitions/Property"
                },
                "secretKey": {
                  "$ref": "#/definitions/Property"
                }
              },
              "additionalProperties": false
            }
          },
          "additionalProperties": {}
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    },
    "EmailDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "authentication": {
          "type": "object",
          "properties": {
            "custom": {
              "type": "object",
              "properties": {
                "apiKey": {
                  "$ref": "#/definitions/Property"
                },
                "senderEmail": {
                  "$ref": "#/definitions/Property"
                },
                "senderName": {
                  "$ref": "#/definitions/Property"
                }
              },
              "additionalProperties": false
            }
          },
          "additionalProperties": false
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    },
    "GraphQLDatasourceConfiguration": {
      "$ref": "#/definitions/DefaultDatasourceConfiguration"
    },
    "DefaultDatasourceConfiguration": {
      "$ref": "#/definitions/BaseDatasourceConfiguration"
    },
    "BaseDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    },
    "JavascriptDatasourceConfiguration": {
      "$ref": "#/definitions/LanguageDatasourceConfiguration"
    },
    "LanguageDatasourceConfiguration": {
      "$ref": "#/definitions/DefaultDatasourceConfiguration"
    },
    "MariaDBDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "authentication": {
          "type": "object",
          "properties": {
            "custom": {
              "type": "object",
              "properties": {
                "databaseName": {
                  "$ref": "#/definitions/Property"
                }
              },
              "additionalProperties": false
            },
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "connection": {
          "type": "object",
          "properties": {
            "useSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "useSelfSignedSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "ca": {
              "type": "string"
            },
            "key": {
              "type": "string"
            },
            "cert": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "endpoint": {
          "type": "object",
          "properties": {
            "host": {
              "type": "string"
            },
            "port": {
              "type": "number",
              "minimum": 0,
              "maximum": 65536
            }
          },
          "additionalProperties": false
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    },
    "MongoDBDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "authentication": {
          "type": "object",
          "properties": {
            "custom": {
              "type": "object",
              "properties": {
                "databaseName": {
                  "$ref": "#/definitions/Property"
                }
              },
              "additionalProperties": false
            },
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "connection": {
          "type": "object",
          "properties": {
            "useSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "useSelfSignedSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "ca": {
              "type": "string"
            },
            "key": {
              "type": "string"
            },
            "cert": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "endpoint": {
          "type": "object",
          "properties": {
            "host": {
              "type": "string"
            },
            "port": {
              "type": "number",
              "minimum": 0,
              "maximum": 65536
            }
          },
          "additionalProperties": false
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    },
    "MySQLDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "authentication": {
          "type": "object",
          "properties": {
            "custom": {
              "type": "object",
              "properties": {
                "databaseName": {
                  "$ref": "#/definitions/Property"
                }
              },
              "additionalProperties": false
            },
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "connection": {
          "type": "object",
          "properties": {
            "useSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "useSelfSignedSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "ca": {
              "type": "string"
            },
            "key": {
              "type": "string"
            },
            "cert": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "endpoint": {
          "type": "object",
          "properties": {
            "host": {
              "type": "string"
            },
            "port": {
              "type": "number",
              "minimum": 0,
              "maximum": 65536
            }
          },
          "additionalProperties": false
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    },
    "PostgresDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "authentication": {
          "type": "object",
          "properties": {
            "custom": {
              "type": "object",
              "properties": {
                "databaseName": {
                  "$ref": "#/definitions/Property"
                }
              },
              "additionalProperties": false
            },
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "connection": {
          "type": "object",
          "properties": {
            "useSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "useSelfSignedSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "ca": {
              "type": "string"
            },
            "key": {
              "type": "string"
            },
            "cert": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "endpoint": {
          "type": "object",
          "properties": {
            "host": {
              "type": "string"
            },
            "port": {
              "type": "number",
              "minimum": 0,
              "maximum": 65536
            }
          },
          "additionalProperties": false
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    },
    "PythonDatasourceConfiguration": {
      "$ref": "#/definitions/LanguageDatasourceConfiguration"
    },
    "RedshiftDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "authentication": {
          "type": "object",
          "properties": {
            "custom": {
              "type": "object",
              "properties": {
                "databaseName": {
                  "$ref": "#/definitions/Property"
                },
                "databaseSchema": {
                  "$ref": "#/definitions/Property"
                }
              },
              "additionalProperties": false
            },
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "connection": {
          "type": "object",
          "properties": {
            "useSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "useSelfSignedSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "ca": {
              "type": "string"
            },
            "key": {
              "type": "string"
            },
            "cert": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "endpoint": {
          "type": "object",
          "properties": {
            "host": {
              "type": "string"
            },
            "port": {
              "type": "number",
              "minimum": 0,
              "maximum": 65536
            }
          },
          "additionalProperties": false
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    },
    "RestApiDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "urlBase": {
          "type": "string"
        },
        "params": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Property"
          }
        },
        "headers": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Property"
          }
        },
        "authType": {
          "$ref": "#/definitions/AuthType"
        },
        "authConfig": {
          "$ref": "#/definitions/AuthConfig"
        },
        "AuthCodeExplanation": {
          "type": "string"
        },
        "FirebaseAlert": {
          "type": "string"
        },
        "HTTPBasicAlert": {
          "type": "string"
        },
        "oauth-callback-alert": {
          "type": "string"
        },
        "OAuth2PasswordAlert": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    },
    "AuthType": {
      "anyOf": [
        {
          "$ref": "#/definitions/RestApiIntegrationAuthType"
        },
        {
          "$ref": "#/definitions/GoogleSheetsAuthType"
        }
      ]
    },
    "RestApiIntegrationAuthType": {
      "type": "string",
      "enum": [
        "None",
        "basic",
        "oauth-code",
        "oauth-client-cred",
        "oauth-implicit",
        "oauth-pword",
        "Firebase"
      ]
    },
    "GoogleSheetsAuthType": {
      "type": "string",
      "enum": [
        "oauth-code",
        "service-account"
      ]
    },
    "AuthConfig": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "googleServiceAccount": {
          "$ref": "#/definitions/Property"
        },
        "clientSecret": {
          "type": "string"
        },
        "clientId": {
          "type": "string"
        },
        "authorizationUrl": {
          "type": "string"
        },
        "tokenUrl": {
          "type": "string"
        },
        "scope": {
          "type": "string"
        },
        "refreshTokenFromServer": {
          "type": "boolean"
        },
        "hasToken": {
          "type": "boolean"
        },
        "tokenScope": {
          "$ref": "#/definitions/TokenScope"
        },
        "authToken": {
          "type": "string"
        },
        "userEmail": {
          "type": "string"
        },
        "apiKey": {
          "type": "string"
        },
        "google": {
          "type": "boolean"
        },
        "email": {
          "type": "boolean"
        },
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "useFixedPasswordCreds": {
          "type": "boolean"
        },
        "shareBasicAuthCreds": {
          "type": [
            "boolean",
            "string"
          ]
        }
      }
    },
    "TokenScope": {
      "type": "string",
      "enum": [
        "datasource",
        "user"
      ]
    },
    "RestApiIntegrationDatasourceConfiguration": {
      "$ref": "#/definitions/RestApiDatasourceConfiguration"
    },
    "S3DatasourceConfiguration": {
      "$ref": "#/definitions/AWSDatasourceConfiguration"
    },
    "SnowflakeDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "authentication": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "custom": {
              "type": "object",
              "properties": {
                "databaseName": {
                  "$ref": "#/definitions/Property"
                },
                "account": {
                  "$ref": "#/definitions/Property"
                },
                "warehouse": {
                  "$ref": "#/definitions/Property"
                },
                "schema": {
                  "$ref": "#/definitions/Property"
                },
                "role": {
                  "$ref": "#/definitions/Property"
                }
              },
              "additionalProperties": false
            }
          },
          "additionalProperties": false
        },
        "connection": {
          "type": "object",
          "properties": {
            "useSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "useSelfSignedSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "ca": {
              "type": "string"
            },
            "key": {
              "type": "string"
            },
            "cert": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "endpoint": {
          "type": "object",
          "properties": {
            "host": {
              "type": "string"
            },
            "port": {
              "type": "number",
              "minimum": 0,
              "maximum": 65536
            }
          },
          "additionalProperties": false
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    },
    "WorkflowDatasourceConfiguration": {
      "$ref": "#/definitions/BaseDatasourceConfiguration"
    },
    "MsSqlDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "authentication": {
          "type": "object",
          "properties": {
            "custom": {
              "type": "object",
              "properties": {
                "databaseName": {
                  "$ref": "#/definitions/Property"
                }
              },
              "additionalProperties": false
            },
            "username": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "connection": {
          "type": "object",
          "properties": {
            "useSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "useSelfSignedSsl": {
              "type": [
                "boolean",
                "string"
              ]
            },
            "ca": {
              "type": "string"
            },
            "key": {
              "type": "string"
            },
            "cert": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "endpoint": {
          "type": "object",
          "properties": {
            "host": {
              "type": "string"
            },
            "port": {
              "type": "number",
              "minimum": 0,
              "maximum": 65536
            }
          },
          "additionalProperties": false
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    },
    "RocksetDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "apiKey": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      },
      "required": [
        "apiKey"
      ]
    },
    "GoogleSheetsDatasourceConfiguration": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "authType": {
          "$ref": "#/definitions/AuthType"
        },
        "authConfig": {
          "$ref": "#/definitions/AuthConfig"
        },
        "OAuth2ConnectedAlert": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "dynamicWorkflowConfiguration": {
          "type": "object",
          "properties": {
            "enabled": {
              "type": "boolean"
            },
            "workflowId": {
              "type": "string"
            }
          },
          "additionalProperties": false
        },
        "superblocksMetadata": {
          "$ref": "#/definitions/PluginVersionMetadata"
        }
      }
    }
  }
};

export const validateDatasourceConfigurationByTypeSchema = getValidatorFunction<DatasourceConfigurationByTypeSchema>(validate as ValidateFunction);
