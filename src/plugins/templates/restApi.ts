import {
  EditorLanguage,
  FormComponentType,
  FormSectionLayout,
  getRestApiBodyLabel,
  getRestApiDataTypeDisplayName,
  getRestApiFieldDisplayName,
  HttpMethod,
  Plugin,
  PluginResponseType,
  PluginType,
  RestApiBodyDataType,
  RestApiFields
} from '../../types';

export const RestApiPluginVersions = {
  V1: '0.0.1',
  V7: '0.0.7',
  V8: '0.0.8'
};

export const RestApiPlugin: Plugin = {
  id: 'restapi',
  name: 'REST API',
  moduleName: 'RestApiPlugin',
  modulePath: 'plugins/restApi/RestApiPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/restapi.png',
  type: PluginType.API,
  responseType: PluginResponseType.JSON,
  hasRawRequest: true,
  rawRequestName: 'Executed Request',
  datasourceTemplate: {
    sections: []
  },
  actionTemplate: {
    sections: [
      {
        name: 'main',
        items: [
          {
            name: RestApiFields.HTTP_METHOD,
            label: getRestApiFieldDisplayName(RestApiFields.HTTP_METHOD),
            startVersion: RestApiPluginVersions.V1,
            componentType: FormComponentType.DROPDOWN,
            initialValue: HttpMethod.GET,
            rules: [{ required: true }],
            options: [
              {
                key: HttpMethod.GET,
                value: HttpMethod.GET
              },
              {
                key: HttpMethod.POST,
                value: HttpMethod.POST
              },
              {
                key: HttpMethod.PUT,
                value: HttpMethod.PUT
              },
              {
                key: HttpMethod.DELETE,
                value: HttpMethod.DELETE
              },
              {
                key: HttpMethod.PATCH,
                value: HttpMethod.PATCH
              }
            ]
          },
          {
            name: RestApiFields.PATH,
            label: getRestApiFieldDisplayName(RestApiFields.PATH),
            startVersion: RestApiPluginVersions.V1,
            componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
            placeholder: 'https://www.example.com/api?filter={{Dropdown1.selectedOptionValue}}',
            subtitle: `Authenticating with OAuth 2.0, Firebase, or Basic Auth? Create a [REST API Integration](/integrations/restapiintegration)`,
            rules: [{ required: true, message: 'URL is required' }]
          }
        ]
      },
      {
        name: 'tabs',
        layout: FormSectionLayout.TABS,
        items: [
          {
            name: RestApiFields.HEADERS,
            label: getRestApiFieldDisplayName(RestApiFields.HEADERS),
            startVersion: RestApiPluginVersions.V1,
            componentType: FormComponentType.FIELD_LIST,
            initialValue: [
              { key: 'Content-Type', value: 'application/json' },
              { key: '', value: '' }
            ],
            secretsNames: ['Authorization']
          },
          {
            name: RestApiFields.PARAMS,
            label: getRestApiFieldDisplayName(RestApiFields.PARAMS),
            startVersion: RestApiPluginVersions.V1,
            componentType: FormComponentType.FIELD_LIST,
            initialValue: [{ key: '', value: '' }]
          },
          {
            name: RestApiFields.BODY,
            label: getRestApiBodyLabel(RestApiBodyDataType.JSON),
            startVersion: RestApiPluginVersions.V1,
            endVersion: RestApiPluginVersions.V7,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON
          },
          {
            name: RestApiFields.BODY_TYPE,
            label: getRestApiFieldDisplayName(RestApiFields.BODY_TYPE),
            startVersion: RestApiPluginVersions.V8,
            componentType: FormComponentType.DROPDOWN,
            initialValue: RestApiBodyDataType.JSON,
            options: Object.values(RestApiBodyDataType).map((bodyType) => ({
              displayName: getRestApiDataTypeDisplayName(bodyType),
              value: bodyType,
              key: bodyType
            }))
          },
          {
            name: RestApiFields.BODY,
            label: getRestApiBodyLabel(RestApiBodyDataType.JSON),
            startVersion: RestApiPluginVersions.V8,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            display: {
              show: {
                bodyType: [RestApiBodyDataType.JSON]
              }
            }
          },
          {
            name: RestApiFields.BODY,
            label: getRestApiBodyLabel(RestApiBodyDataType.RAW),
            startVersion: RestApiPluginVersions.V8,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.TEXT,
            display: {
              show: {
                bodyType: [RestApiBodyDataType.RAW]
              }
            }
          },
          {
            name: RestApiFields.FORM_DATA,
            label: getRestApiBodyLabel(RestApiBodyDataType.FORM),
            startVersion: RestApiPluginVersions.V8,
            componentType: FormComponentType.FIELD_LIST,
            display: {
              show: {
                bodyType: [RestApiBodyDataType.FORM]
              }
            },
            initialValue: [{ key: '', value: '' }]
          },
          {
            name: RestApiFields.FILE_FORM_KEY,
            label: getRestApiFieldDisplayName(RestApiFields.FILE_FORM_KEY),
            startVersion: RestApiPluginVersions.V8,
            componentType: FormComponentType.INPUT_TEXT,
            initialValue: 'file',
            display: {
              show: {
                bodyType: [RestApiBodyDataType.FILE_FORM]
              }
            }
          },
          {
            name: RestApiFields.FILE_NAME,
            label: getRestApiFieldDisplayName(RestApiFields.FILE_NAME),
            startVersion: RestApiPluginVersions.V8,
            componentType: FormComponentType.INPUT_TEXT,
            display: {
              show: {
                bodyType: [RestApiBodyDataType.FILE_FORM]
              }
            }
          },
          {
            name: RestApiFields.BODY,
            label: getRestApiBodyLabel(RestApiBodyDataType.FILE_FORM),
            startVersion: RestApiPluginVersions.V8,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.TEXT,
            display: {
              show: {
                bodyType: [RestApiBodyDataType.FILE_FORM]
              }
            }
          }
        ]
      }
    ]
  },
  demoData: {
    path: 'https://xkcd.com/info.0.json',
    httpMethod: HttpMethod.GET
  }
};
