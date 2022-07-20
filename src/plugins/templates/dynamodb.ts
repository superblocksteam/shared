import {
  AgentType,
  DropdownOption,
  EditorLanguage,
  FormComponentType,
  InputDataType,
  Plugin,
  PluginResponseType,
  PluginType
} from '../../types';
import { camelCaseToDisplay } from '../../utils';
import { getAWSAuthSection } from './shared';

export const DynamoDBActions = [
  'getItem',
  'updateItem',
  'putItem',
  'deleteItem',
  'query',
  'scan',
  'executeStatement',
  'executeTransaction',
  'listTagsOfResource',
  'tagResource',
  'listTables',
  'describeTable',
  'createTable',
  'updateTable',
  'deleteTable'
  // "batchExecuteStatement",
  // "batchGetItem",
  // "batchWriteItem",
  // "createBackup",
  // "createGlobalTable",
  // "deleteBackup",
  // "describeBackup",
  // "describeContinuousBackups",
  // "describeContributorInsights",
  // "describeEndpoints",
  // "describeExport",
  // "describeGlobalTable",
  // "describeGlobalTableSettings",
  // "describeKinesisStreamingDestination",
  // "describeLimits",
  // "describeTableReplicaAutoScaling",
  // "describeTimeToLive",
  // "disableKinesisStreamingDestination",
  // "enableKinesisStreamingDestination",
  // "exportTableToPointInTime",
  // "listBackups",
  // "listContributorInsights",
  // "listExports",
  // "listGlobalTables",
  // "restoreTableFromBackup",
  // "restoreTableToPointInTime",
  // "transactGetItems",
  // "transactWriteItems",
  // "untagResource",
  // "updateContinuousBackups",
  // "updateContributorInsights",
  // "updateGlobalTable",
  // "updateGlobalTableSettings",
  // "updateTableReplicaAutoScaling",
  // "updateTimeToLive",
  // "waitFor",
];

function getDynamoDBActionDropdownOptions(): DropdownOption[] {
  return DynamoDBActions.map(
    (method: string): DropdownOption => {
      const displayName = camelCaseToDisplay(method);

      return {
        key: method,
        value: method,
        displayName: displayName
      };
    }
  );
}

export const DynamoDBPluginVersions = {
  V1: '0.0.1',
  V4: '0.0.4'
};

export const DynamoDBPlugin: Plugin = {
  id: 'dynamodb',
  name: 'DynamoDB',
  moduleName: 'DynamoDBPlugin',
  modulePath: 'plugins/dynamodb/DynamoDBPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/dynamodb.png',
  type: PluginType.DB,
  responseType: PluginResponseType.JSON,
  hasRawRequest: true,
  rawRequestName: 'Executed Query',
  datasourceTemplate: {
    sections: [
      {
        name: 'main',
        items: [
          {
            label: 'Display Name',
            name: 'name',
            startVersion: DynamoDBPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            rules: [{ required: true, message: 'Display Name is required' }]
          },
          {
            label: 'Region',
            name: 'authentication.custom.region.value',
            startVersion: DynamoDBPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            agentType: AgentType.MULTITENANT
          },
          {
            label: 'Access Key ID',
            name: 'authentication.custom.accessKeyID.value',
            startVersion: DynamoDBPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            agentType: AgentType.MULTITENANT
          },
          {
            label: 'Secret Key',
            name: 'authentication.custom.secretKey.value',
            startVersion: DynamoDBPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            dataType: InputDataType.PASSWORD,
            agentType: AgentType.MULTITENANT
          }
        ]
      },
      getAWSAuthSection({ startVersion: DynamoDBPluginVersions.V4 })
    ]
  },
  actionTemplate: {
    sections: [
      {
        name: 'main',
        items: [
          {
            label: 'Action',
            name: 'action',
            startVersion: DynamoDBPluginVersions.V1,
            componentType: FormComponentType.DROPDOWN,
            initialValue: DynamoDBActions.length > 0 && DynamoDBActions[0],
            options: getDynamoDBActionDropdownOptions()
          },
          {
            label: 'Params',
            name: 'body',
            startVersion: DynamoDBPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            placeholder: `{
  "TableName": "ExampleTable",
  "Key": {
      "PK": "user#abc",
      "SK": "account#0123456789"
  },
  "ConditionExpression": "#balance > :amount",
  "ExpressionAttributeNames": {
      "#balance": "balance"
  },
  "ExpressionAttributeValues": {
      ":amount": { "N": "123" },
      ":zero": { "N": "0" },
  }
}`
          }
        ]
      }
    ]
  }
};
