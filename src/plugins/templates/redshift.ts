import { EditorLanguage, FormComponentType, InputDataType, Plugin, PluginResponseType, PluginType } from '../../types';
import { SQL_INITIAL_TEXT } from './constants';

export const RedshiftPluginVersions = {
  V1: '0.0.1',
  V2: '0.0.2',
  V6: '0.0.6'
};

export const RedshiftPlugin: Plugin = {
  id: 'redshift',
  name: 'AWS RedShift',
  moduleName: 'RedshiftPlugin',
  modulePath: 'plugins/redshift/RedshiftPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/redshift.png',
  docsUrl: 'https://docs.superblocks.com/integrations/connect-integrations/redshift',
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
            startVersion: RedshiftPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'Redshift Prod Cluster',
            rules: [{ required: true, message: 'Display Name is required' }]
          },
          {
            label: 'Host',
            name: 'endpoint.host',
            startVersion: RedshiftPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'superblocks-redshift-dev.clyn5z3du7tf.us-west-2.redshift.amazonaws.com',
            rules: [{ required: true, message: 'Host is required' }]
          },
          {
            label: 'Port',
            name: 'endpoint.port',
            startVersion: RedshiftPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            initialValue: '5439',
            dataType: InputDataType.NUMBER
          },
          {
            label: 'Schema',
            name: 'authentication.custom.databaseSchema.value',
            startVersion: RedshiftPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            initialValue: 'public'
          },
          {
            label: 'Database Name',
            name: 'authentication.custom.databaseName.value',
            startVersion: RedshiftPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT
          },
          {
            label: 'Database Username',
            name: 'authentication.username',
            startVersion: RedshiftPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT
          },
          {
            label: 'Database Password',
            name: 'authentication.password',
            startVersion: RedshiftPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            dataType: InputDataType.PASSWORD
          },
          {
            label: 'Enable SSL',
            name: 'connection.useSsl',
            startVersion: RedshiftPluginVersions.V1,
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
            label: '', // Query
            name: 'body',
            startVersion: RedshiftPluginVersions.V1,
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
            startVersion: RedshiftPluginVersions.V6,
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
