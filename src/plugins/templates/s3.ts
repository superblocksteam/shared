import { AgentType, EditorLanguage, FormComponentType, InputDataType, Plugin, PluginResponseType, PluginType } from '../../types';

import { getAWSAuthSection } from './shared';

export const S3PluginVersions = {
  V1: '0.0.1',
  V5: '0.0.5'
};

export enum S3ActionType {
  LIST_OBJECTS = 'LIST_OBJECTS',
  GET_OBJECT = 'GET_OBJECT',
  DELETE_OBJECT = 'DELETE_OBJECT',
  UPLOAD_OBJECT = 'UPLOAD_OBJECT',
  LIST_BUCKETS = 'LIST_BUCKETS',
  CREATE_BUCKET = 'CREATE_BUCKET',
  UPLOAD_MULTIPLE_OBJECTS = 'UPLOAD_MULTIPLE_OBJECTS',
  GENERATE_PRESIGNED_URL = 'GENERATE_PRESIGNED_URL'
}

export const S3_ACTION_DISPLAY_NAMES: Record<S3ActionType, string> = {
  [S3ActionType.LIST_OBJECTS]: 'List Files',
  [S3ActionType.GET_OBJECT]: 'Read File',
  [S3ActionType.DELETE_OBJECT]: 'Delete Files',
  [S3ActionType.UPLOAD_OBJECT]: 'Upload File',
  [S3ActionType.LIST_BUCKETS]: 'List Buckets',
  [S3ActionType.CREATE_BUCKET]: 'Create Bucket',
  [S3ActionType.UPLOAD_MULTIPLE_OBJECTS]: 'Upload Multiple Files',
  [S3ActionType.GENERATE_PRESIGNED_URL]: 'Generate Presigned URL'
};

export const DEFAULT_S3_PRESIGNED_URL_EXPIRATION_SECONDS = 60 * 10;

export const S3Plugin: Plugin = {
  id: 's3',
  name: 'AWS S3',
  moduleName: 'S3Plugin',
  modulePath: 'plugins/s3/S3Plugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/s3.png',
  docsUrl: 'https://docs.superblocks.com/integrations/connect-integrations/s3',
  type: PluginType.API,
  responseType: PluginResponseType.JSON,
  hasRawRequest: true,
  rawRequestName: 'Executed Action',
  datasourceTemplate: {
    sections: [
      {
        name: 'main',
        items: [
          {
            label: 'Display Name',
            name: 'name',
            startVersion: S3PluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            rules: [{ required: true, message: 'Display Name is required' }]
          },
          {
            label: 'Region',
            name: 'authentication.custom.region.value',
            startVersion: S3PluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            agentType: AgentType.MULTITENANT
          },
          {
            label: 'Access Key ID',
            name: 'authentication.custom.accessKeyID.value',
            startVersion: S3PluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            agentType: AgentType.MULTITENANT
          },
          {
            label: 'Secret Key',
            name: 'authentication.custom.secretKey.value',
            startVersion: S3PluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            dataType: InputDataType.PASSWORD,
            agentType: AgentType.MULTITENANT
          }
        ]
      },
      getAWSAuthSection({ startVersion: S3PluginVersions.V5 })
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
            startVersion: S3PluginVersions.V1,
            componentType: FormComponentType.DROPDOWN,
            initialValue: S3ActionType.GET_OBJECT,
            rules: [{ required: true }],
            options: [
              {
                key: S3ActionType.LIST_OBJECTS,
                value: S3ActionType.LIST_OBJECTS,
                displayName: S3_ACTION_DISPLAY_NAMES[S3ActionType.LIST_OBJECTS]
              },
              {
                key: S3ActionType.GET_OBJECT,
                value: S3ActionType.GET_OBJECT,
                displayName: S3_ACTION_DISPLAY_NAMES[S3ActionType.GET_OBJECT]
              },
              {
                key: S3ActionType.DELETE_OBJECT,
                value: S3ActionType.DELETE_OBJECT,
                displayName: S3_ACTION_DISPLAY_NAMES[S3ActionType.DELETE_OBJECT]
              },
              {
                key: S3ActionType.UPLOAD_OBJECT,
                value: S3ActionType.UPLOAD_OBJECT,
                displayName: S3_ACTION_DISPLAY_NAMES[S3ActionType.UPLOAD_OBJECT]
              },
              {
                key: S3ActionType.UPLOAD_MULTIPLE_OBJECTS,
                value: S3ActionType.UPLOAD_MULTIPLE_OBJECTS,
                displayName: S3_ACTION_DISPLAY_NAMES[S3ActionType.UPLOAD_MULTIPLE_OBJECTS]
              },
              {
                key: S3ActionType.LIST_BUCKETS,
                value: S3ActionType.LIST_BUCKETS,
                displayName: S3_ACTION_DISPLAY_NAMES[S3ActionType.LIST_BUCKETS]
              },
              {
                key: S3ActionType.GENERATE_PRESIGNED_URL,
                value: S3ActionType.GENERATE_PRESIGNED_URL,
                displayName: S3_ACTION_DISPLAY_NAMES[S3ActionType.GENERATE_PRESIGNED_URL]
              }
            ]
          },
          {
            label: 'Bucket Name',
            name: 'resource',
            startVersion: S3PluginVersions.V1,
            componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
            display: {
              show: {
                action: [
                  S3ActionType.LIST_OBJECTS,
                  S3ActionType.GET_OBJECT,
                  S3ActionType.UPLOAD_OBJECT,
                  S3ActionType.DELETE_OBJECT,
                  S3ActionType.UPLOAD_MULTIPLE_OBJECTS,
                  S3ActionType.GENERATE_PRESIGNED_URL
                ]
              }
            }
          },
          {
            label: 'File Name',
            name: 'path',
            startVersion: S3PluginVersions.V1,
            componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
            display: {
              show: {
                action: [
                  S3ActionType.UPLOAD_OBJECT,
                  S3ActionType.GET_OBJECT,
                  S3ActionType.DELETE_OBJECT,
                  S3ActionType.GENERATE_PRESIGNED_URL
                ]
              }
            }
          },
          {
            label: 'File Content',
            name: 'body',
            startVersion: S3PluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.TEXT,
            display: {
              show: {
                action: [S3ActionType.UPLOAD_OBJECT]
              }
            }
          },
          {
            label: 'File Objects Array',
            name: 'fileObjects',
            startVersion: S3PluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.TEXT,
            placeholder: `File objects represent a Superblocks file entity.

Access the files from {{FilePicker1.files}}, or manipulate the files using:

{{FilePicker1.files.map((file) => ({
  ...file,
  name: 'user-assets/' + file.name,
}))}}
            `,
            display: {
              show: {
                action: [S3ActionType.UPLOAD_MULTIPLE_OBJECTS]
              }
            }
          },
          {
            label: 'Presigned URL Expiration (seconds)',
            name: 'custom.presignedExpiration.value',
            startVersion: S3PluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            initialValue: DEFAULT_S3_PRESIGNED_URL_EXPIRATION_SECONDS,
            dataType: InputDataType.NUMBER,
            display: {
              show: {
                action: [S3ActionType.GENERATE_PRESIGNED_URL]
              }
            }
          }
        ]
      }
    ]
  }
};
