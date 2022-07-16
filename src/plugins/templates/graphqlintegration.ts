import {
  EditorLanguage,
  ExtendedIntegrationPluginId,
  FormComponentType,
  FormSectionLayout,
  Plugin,
  PluginResponseType,
  PluginType
} from '../../types';

export const GraphQLIntegrationPluginVersions = {
  V1: '0.0.1'
};

export enum GraphQLIntegrationPluginMergedFieldNames {
  HEADERS = 'headers'
  // potentially variables too if converted to FieldList component
  // VARIABLES = 'custom.variables.value'
}

export const GraphQLIntegrationPlugin: Plugin = {
  id: ExtendedIntegrationPluginId.GRAPHQL,
  name: 'GraphQL',
  moduleName: 'GraphQLPlugin',
  modulePath: 'plugins/graphql/GraphQLPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/graphql.png',
  type: PluginType.API,
  responseType: PluginResponseType.JSON,
  hasRawRequest: true,
  rawRequestName: 'Executed Request',
  datasourceTemplate: {
    sections: [
      {
        name: 'main',
        items: [
          {
            label: 'Display Name',
            name: 'name',
            startVersion: GraphQLIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'Example API',
            rules: [{ required: true, message: 'Display Name is required' }]
          },
          {
            label: 'URL',
            name: 'path',
            startVersion: GraphQLIntegrationPluginVersions.V1,
            componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
            placeholder: 'https://www.example.com/api?filter={{Dropdown1.selectedOptionValue}}',
            rules: [{ required: true, message: 'URL is required' }]
          }
        ]
      },
      {
        name: 'tabs',
        layout: FormSectionLayout.TABS,
        items: [
          {
            label: 'Headers',
            name: GraphQLIntegrationPluginMergedFieldNames.HEADERS,
            startVersion: GraphQLIntegrationPluginVersions.V1,
            componentType: FormComponentType.FIELD_LIST,
            secretsNames: ['Authorization']
          }
        ]
      }
    ]
  },
  actionTemplate: {
    sections: [
      {
        name: 'main',
        items: [
          {
            label: 'URL',
            name: 'path',
            startVersion: GraphQLIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            disabled: true
          }
        ]
      },
      {
        name: 'tabs',
        layout: FormSectionLayout.TABS,
        items: [
          {
            label: 'Query',
            name: 'body',
            startVersion: GraphQLIntegrationPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON
          },
          {
            label: 'Variables',
            name: 'custom.variables.value',
            startVersion: GraphQLIntegrationPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON
          },
          {
            label: 'Headers',
            name: GraphQLIntegrationPluginMergedFieldNames.HEADERS,
            startVersion: GraphQLIntegrationPluginVersions.V1,
            componentType: FormComponentType.FIELD_LIST
          }
        ]
      }
    ]
  }
};
