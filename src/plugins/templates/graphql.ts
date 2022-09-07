import {
  EditorLanguage,
  FormComponentType,
  FormSectionLayout,
  GRAPHQL_BASE_PLUGIN_ID,
  Plugin,
  PluginResponseType,
  PluginType
} from '../../types';

export const GraphQLPluginVersions = {
  V1: '0.0.1'
};

export const GraphQLPlugin: Plugin = {
  id: GRAPHQL_BASE_PLUGIN_ID,
  name: 'GraphQL',
  moduleName: 'GraphQLPlugin',
  modulePath: 'plugins/graphql/GraphQLPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/graphql.png',
  docsUrl: 'https://docs.superblocks.com/integrations/connect-integrations/graphql',
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
            label: 'URL',
            name: 'path',
            startVersion: GraphQLPluginVersions.V1,
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
            label: 'Query',
            name: 'body',
            startVersion: GraphQLPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON
          },
          {
            label: 'Variables',
            name: 'custom.variables.value',
            startVersion: GraphQLPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON
          },
          {
            label: 'Headers',
            name: 'headers',
            startVersion: GraphQLPluginVersions.V1,
            componentType: FormComponentType.FIELD_LIST,
            initialValue: [
              { key: 'Content-Type', value: 'application/json' },
              { key: '', value: '' }
            ]
          }
        ]
      }
    ]
  },
  demoData: {
    path: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    body: `query {
  allFilms {
    films {
      title
    }
  }
}`
  }
};
