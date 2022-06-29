import { EditorLanguage, FormComponentType, FormSectionLayout, Plugin, PluginResponseType, PluginType } from '../../types';

export const GraphQLPluginVersions = {
  V1: '0.0.1'
};

export const GraphQLPlugin: Plugin = {
  id: 'graphql',
  name: 'GraphQL',
  moduleName: 'GraphQLPlugin',
  modulePath: 'plugins/graphql/GraphQLPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/graphql.png',
  type: PluginType.API,
  responseType: PluginResponseType.JSON,
  hasRawRequest: true,
  rawRequestName: 'Executed Request',
  agentVersion: '0.0.1',
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
