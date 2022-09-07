import { DB_SQL_INITIAL_TEXT, EditorLanguage, FormComponentType, Plugin, PluginResponseType, PluginType } from '../../types';

export const RocksetPluginVersions = {
  V1: '0.0.1'
};

export const RocksetPlugin: Plugin = {
  id: 'rockset',
  name: 'Rockset',
  moduleName: 'RocksetPlugin',
  modulePath: 'plugins/rockset/RocksetPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/rockset.png',
  docsUrl: 'https://docs.superblocks.com/integrations/connect-integrations/rockset',
  type: PluginType.DB,
  responseType: PluginResponseType.TABLE,
  hasRawRequest: true,
  rawRequestName: 'Executed SQL',
  datasourceTemplate: {
    sections: [
      {
        name: 'main',
        items: [
          {
            label: 'Display Name',
            name: 'name',
            startVersion: RocksetPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'Example Rockset Integration',
            rules: [{ required: true, message: 'Display Name is required' }]
          },
          {
            name: 'apiKey',
            label: 'API Key',
            startVersion: RocksetPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            rules: [{ required: true, message: 'API Key is required' }]
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
            label: '', // Query
            name: 'body',
            startVersion: RocksetPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.SQL,
            initialValue: DB_SQL_INITIAL_TEXT
          }
        ]
      }
    ]
  }
};
