import { EditorLanguage, FormComponentType, Plugin, PluginResponseType, PluginType } from '../../types';
import { SERVICE_ACCOUNT_GHOST_TEXT, SQL_INITIAL_TEXT } from './constants';

export const BigQueryPluginVersions = {
  V1: '0.0.1',
  V2: '0.0.2',
  V6: '0.0.6'
};

export const BigQueryPlugin: Plugin = {
  id: 'bigquery',
  name: 'BigQuery',
  moduleName: 'BigqueryPlugin',
  modulePath: 'plugins/bigquery/BigqueryPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/bigquery.png',
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
            startVersion: BigQueryPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'BigQuery Production',
            rules: [{ required: true, message: 'Display Name is required' }]
          },
          {
            label: 'Service Account Key',
            name: 'authentication.custom.googleServiceAccount.value',
            startVersion: BigQueryPluginVersions.V1,
            // INPUT_AREA is broken (cannot be udpated after unfocus). Using
            // code editor for now.
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            placeholder: SERVICE_ACCOUNT_GHOST_TEXT,
            rules: [{ required: true, message: 'Service Account Key is required' }]
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
            startVersion: BigQueryPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.SQL,
            initialValue: SQL_INITIAL_TEXT
          }
        ]
      },
      {
        name: 'advanced:main',
        items: [
          {
            label: 'Use Parameterized SQL',
            name: 'usePreparedSql',
            startVersion: BigQueryPluginVersions.V6,
            componentType: FormComponentType.SWITCH,
            initialValue: true,
            tooltip: {
              markdownText: 'Using Parameterized SQL provides SQL injection protection but inhibits the use of JavaScript to generate SQL.'
            }
          }
        ]
      }
    ]
  }
};
