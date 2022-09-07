import { DB_SQL_INITIAL_TEXT, EditorLanguage, FormComponentType, InputDataType, Plugin, PluginResponseType, PluginType } from '../../types';

export const PostgresPluginVersions = {
  V1: '0.0.1',
  V2: '0.0.2',
  V6: '0.0.6'
};

export const PostgresPlugin: Plugin = {
  id: 'postgres',
  name: 'Postgres',
  moduleName: 'PostgresPlugin',
  modulePath: 'plugins/postgres/PostgresPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/postgres.png',
  docsUrl: 'https://docs.superblocks.com/integrations/connect-integrations/postgres',
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
            startVersion: PostgresPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'ProdDB',
            rules: [{ required: true, message: 'Display Name is required' }]
          },
          {
            label: 'Host',
            name: 'endpoint.host',
            startVersion: PostgresPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'staging-database.amazonaws.com',
            rules: [{ required: true, message: 'Host is required' }]
          },
          {
            label: 'Port',
            name: 'endpoint.port',
            startVersion: PostgresPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            initialValue: '5432',
            rules: [{ required: true, message: 'Port is required' }]
          },
          {
            label: 'Database Name',
            name: 'authentication.custom.databaseName.value',
            startVersion: PostgresPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT
          },
          {
            label: 'Database Username',
            name: 'authentication.username',
            startVersion: PostgresPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT
          },
          {
            label: 'Database Password',
            name: 'authentication.password',
            startVersion: PostgresPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            dataType: InputDataType.PASSWORD
          },
          {
            label: 'Enable SSL',
            name: 'connection.useSsl',
            startVersion: PostgresPluginVersions.V1,
            initialValue: 'checked',
            componentType: FormComponentType.CHECKBOX
          },
          {
            label: 'Use a self-signed SSL certificate',
            name: 'connection.useSelfSignedSsl',
            startVersion: PostgresPluginVersions.V1,
            componentType: FormComponentType.CHECKBOX,
            tooltip: {
              markdownText:
                'Use a self-signed SSL certificate, e.g. when [connecting to Cloud SQL](https://cloud.google.com/sql/docs/postgres/connect-admin-ip#connect-ssl)'
            }
          },
          {
            label: 'Server CA',
            name: 'connection.ca',
            startVersion: PostgresPluginVersions.V1,
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
            startVersion: PostgresPluginVersions.V1,
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
            startVersion: PostgresPluginVersions.V1,
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
            label: '', // Query
            name: 'body',
            startVersion: PostgresPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.SQL,
            initialValue: DB_SQL_INITIAL_TEXT
          }
        ]
      },
      {
        name: 'advanced:main',
        items: [
          {
            label: 'Use Parameterized SQL',
            name: 'usePreparedSql',
            startVersion: PostgresPluginVersions.V6,
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
