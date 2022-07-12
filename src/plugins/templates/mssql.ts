import { DB_SQL_INITIAL_TEXT, EditorLanguage, FormComponentType, InputDataType, Plugin, PluginResponseType, PluginType } from '../../types';

export const MicrosoftSQLPluginVersions = {
  V1: '0.0.1',
  V2: '0.0.2',
  V3: '0.0.3'
};

export const MicrosoftSQLPlugin: Plugin = {
  id: 'mssql',
  name: 'Microsoft SQL',
  moduleName: 'MicrosoftSQLPlugin',
  modulePath: 'plugins/mssql/MicrosoftSQLPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/mssql.png',
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
            startVersion: MicrosoftSQLPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'ProdDB',
            rules: [{ required: true, message: 'Display Name is required' }]
          },
          {
            label: 'Host',
            name: 'endpoint.host',
            startVersion: MicrosoftSQLPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'example.database.windows.net',
            rules: [{ required: true, message: 'Host is required' }]
          },
          {
            label: 'Port',
            name: 'endpoint.port',
            startVersion: MicrosoftSQLPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            initialValue: '1433',
            rules: [{ required: true, message: 'Port is required' }]
          },
          {
            label: 'Database Name',
            name: 'authentication.custom.databaseName.value',
            startVersion: MicrosoftSQLPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT
          },
          {
            label: 'Database Username',
            name: 'authentication.username',
            startVersion: MicrosoftSQLPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT
          },
          {
            label: 'Database Password',
            name: 'authentication.password',
            startVersion: MicrosoftSQLPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            dataType: InputDataType.PASSWORD
          },
          {
            label: 'Enable SSL',
            name: 'connection.useSsl',
            startVersion: MicrosoftSQLPluginVersions.V1,
            initialValue: 'checked',
            componentType: FormComponentType.CHECKBOX
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
            label: 'Use Parameterized SQL',
            name: 'usePreparedSql',
            startVersion: MicrosoftSQLPluginVersions.V3,
            componentType: FormComponentType.SWITCH,
            initialValue: false,
            tooltip: {
              markdownText: 'This enables the use of JavaScript to generate SQL but also turns off SQL injection protection.'
            }
          },
          {
            label: '', // Query
            name: 'body',
            startVersion: MicrosoftSQLPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.SQL,
            initialValue: DB_SQL_INITIAL_TEXT
          }
        ]
      }
    ]
  }
};
