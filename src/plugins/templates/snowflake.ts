import { EditorLanguage, FormComponentType, InputDataType, Plugin, PluginResponseType, PluginType } from '../../types';
import { SQL_INITIAL_TEXT } from './constants';

export const SnowflakePluginVersions = {
  V1: '0.0.1',
  V2: '0.0.2'
};

export const SnowflakePlugin: Plugin = {
  id: 'snowflake',
  name: 'Snowflake',
  moduleName: 'SnowflakePlugin',
  modulePath: 'plugins/snowflake/SnowflakePlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/snowflake.png',
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
            startVersion: SnowflakePluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'Snowflake Prod',
            rules: [{ required: true, message: 'Display Name is required' }]
          },
          {
            label: 'Database Account',
            name: 'authentication.custom.account.value',
            startVersion: SnowflakePluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'xyz12345.us-east-1',
            rules: [{ required: true, message: 'Account is required' }]
          },
          {
            label: 'Database Name',
            name: 'authentication.custom.databaseName.value',
            startVersion: SnowflakePluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            rules: [{ required: true, message: 'Database Name is required' }]
          },
          {
            label: 'Database Warehouse',
            name: 'authentication.custom.warehouse.value',
            startVersion: SnowflakePluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT
          },
          {
            label: 'Database Schema',
            name: 'authentication.custom.schema.value',
            startVersion: SnowflakePluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'PUBLIC'
          },
          {
            label: 'Database Username',
            name: 'authentication.username',
            startVersion: SnowflakePluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT
          },
          {
            label: 'Database Password',
            name: 'authentication.password',
            startVersion: SnowflakePluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            dataType: InputDataType.PASSWORD
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
            startVersion: SnowflakePluginVersions.V2,
            componentType: FormComponentType.SWITCH,
            initialValue: false,
            tooltip: {
              markdownText: 'This enables the use of JavaScript to generate SQL but also turns off SQL injection protection.'
            }
          },
          {
            label: '', // Query
            name: 'body',
            startVersion: SnowflakePluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.SQL,
            initialValue: SQL_INITIAL_TEXT
          }
        ]
      }
    ]
  }
};
