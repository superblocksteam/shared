import { DB_SQL_INITIAL_TEXT, EditorLanguage, FormComponentType, InputDataType, Plugin, PluginResponseType, PluginType } from '../../types';

export const MySQLPluginVersions = {
  V1: '0.0.1',
  V2: '0.0.2'
};

export const MySQLPlugin: Plugin = {
  id: 'mysql',
  name: 'MySQL',
  moduleName: 'MySQLPlugin',
  modulePath: 'plugins/mysql/MySQLPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/mysql.png',
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
            startVersion: MySQLPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'ProdDB',
            rules: [{ required: true, message: 'Display Name is required' }]
          },
          {
            label: 'Host',
            name: 'endpoint.host',
            startVersion: MySQLPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'staging-database.amazonaws.com',
            rules: [{ required: true, message: 'Host is required' }]
          },
          {
            label: 'Port',
            name: 'endpoint.port',
            startVersion: MySQLPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            initialValue: '3306',
            rules: [{ required: true, message: 'Port is required' }]
          },
          {
            label: 'Database Name',
            name: 'authentication.custom.databaseName.value',
            startVersion: MySQLPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT
          },
          {
            label: 'Database Username',
            name: 'authentication.username',
            startVersion: MySQLPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT
          },
          {
            label: 'Database Password',
            name: 'authentication.password',
            startVersion: MySQLPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            dataType: InputDataType.PASSWORD
          },
          {
            label: 'Enable SSL',
            name: 'connection.useSsl',
            startVersion: MySQLPluginVersions.V1,
            initialValue: 'checked',
            componentType: FormComponentType.CHECKBOX
          },
          {
            label: 'Use a self-signed SSL certificate',
            name: 'connection.useSelfSignedSsl',
            startVersion: MySQLPluginVersions.V1,
            componentType: FormComponentType.CHECKBOX,
            tooltip: {
              markdownText:
                'Use a self-signed SSL certificate, e.g. when [connecting to Cloud SQL](https://cloud.google.com/sql/docs/postgres/connect-admin-ip#connect-ssl)'
            }
          },
          {
            label: 'Server CA',
            name: 'connection.ca',
            startVersion: MySQLPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.TEXT,
            placeholder:
              '-----BEGIN CERTIFICATE-----\n' +
              'MIIC/jCCAeYCCQDLwS4pIwJC3zANBgkqhkiG9w0BAQsFADBBMQswCQYDVQQGEwJV\n' +
              '...\n' +
              '-----END CERTIFICATE-----',
            display: {
              show: {
                'connection.useSelfSignedSsl': ['true']
              }
            }
          },
          {
            label: 'Client Key',
            name: 'connection.key',
            startVersion: MySQLPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.TEXT,
            placeholder:
              '-----BEGIN RSA PRIVATE KEY-----\n' +
              'BAoMBFRlc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCpvozN05Ou\n' +
              '...\n' +
              '-----END RSA PRIVATE KEY-----',
            display: {
              show: {
                'connection.useSelfSignedSsl': ['true']
              }
            }
          },
          {
            label: 'Client Cert',
            name: 'connection.cert',
            startVersion: MySQLPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.TEXT,
            placeholder:
              '-----BEGIN CERTIFICATE-----\n' +
              'Ur2LYWdrVjqlS/wJyVIze15FMf7sgl+RINsLbQDLwS4pIwJC3zANBgkqhkiG9w0B\n' +
              '...\n' +
              '-----END CERTIFICATE-----',
            display: {
              show: {
                'connection.useSelfSignedSsl': ['true']
              }
            }
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
            startVersion: MySQLPluginVersions.V2,
            componentType: FormComponentType.SWITCH,
            initialValue: false,
            tooltip: {
              markdownText: 'This enables the use of JavaScript to generate SQL but also turns off SQL injection protection.'
            }
          },
          {
            label: '', // Query
            name: 'body',
            startVersion: MySQLPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.SQL,
            initialValue: DB_SQL_INITIAL_TEXT
          }
        ]
      }
    ]
  }
};
