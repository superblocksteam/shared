import {
  EditorLanguage,
  ExtendedIntegrationPluginId,
  FormComponentType,
  FormSectionLayout,
  getDisplayName,
  getRestApiBodyLabel,
  getRestApiDataTypeDisplayName,
  getRestApiFieldDisplayName,
  HttpMethod,
  InputDataType,
  Plugin,
  PluginResponseType,
  PluginType,
  RestApiBodyDataType,
  RestApiFields,
  RestApiIntegrationAuthType
} from '../../types';

export enum RestApiIntegrationPluginMergedFieldNames {
  HEADERS = 'headers',
  PARAMS = 'params'
}

export const RestApiIntegrationPluginVersions = {
  V1: '0.0.1',
  V7: '0.0.7',
  V8: '0.0.8'
};

export const RestApiIntegrationPlugin: Plugin = {
  id: ExtendedIntegrationPluginId.REST_API,
  name: 'REST API',
  moduleName: 'RestApiIntegrationPlugin',
  modulePath: 'plugins/restApiIntegration/RestApiIntegrationPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/restapi.png',
  docsUrl: 'https://docs.superblocks.com/integrations/connect-integrations/rest-apis',
  type: PluginType.API,
  responseType: PluginResponseType.JSON,
  hasRawRequest: true,
  hasTest: false,
  datasourceTemplate: {
    sections: [
      {
        name: 'main',
        items: [
          {
            label: 'Display Name',
            name: 'name',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'Example API',
            rules: [{ required: true, message: 'Display Name is required' }]
          },
          {
            name: 'urlBase',
            label: 'Base URL',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: 'https://www.example.com/api',
            rules: [{ required: true, message: 'Base URL is required' }]
          }
        ]
      },
      {
        name: 'auth',
        borderThreshold: 1,
        items: [
          {
            name: RestApiFields.AUTH_TYPE,
            label: getRestApiFieldDisplayName(RestApiFields.AUTH_TYPE),
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.DROPDOWN,
            initialValue: RestApiIntegrationAuthType.NONE,
            options: Object.values(RestApiIntegrationAuthType).map((authType) => ({
              displayName: getDisplayName(authType),
              value: authType,
              key: authType
            }))
          },
          {
            label: '',
            messageTemplate: `HTTP Basic Authentication automatically adds an
            \`Authorization: Basic $token\` header, where the token is generated
            based on the given username and password. It will override any other
            Authorization headers.`,
            name: 'HTTPBasicAlert',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.ALERT,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.BASIC]
              }
            }
          },
          {
            label: 'Share username/password across all users',
            // Explicitly use a different var from useFixedPasswordCreds since
            // this is semantically pretty different for this auth type. They
            // default to opposite values for example.
            name: 'authConfig.shareBasicAuthCreds',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.CHECKBOX,
            tooltip: {
              markdownText: `When enabled, all users will share a fixed set of
            credentials. When disabled, users will be prompted to enter a
            username/password to authenticate themselves with this integration.`
            },
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.BASIC]
              }
            },
            initialValue: true
          },
          {
            label: 'Username',
            name: 'authConfig.username',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: `username`,
            singleLine: true,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.BASIC],
                // Adding undefined is a bit of a hack here to show this field
                // when the default value is set. This will be removed soon.
                'authConfig.shareBasicAuthCreds': ['true', 'undefined']
              }
            }
          },
          {
            label: 'Password',
            name: 'authConfig.password',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: `password`,
            dataType: InputDataType.PASSWORD,
            singleLine: true,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.BASIC],
                // Adding undefined is a bit of a hack here to show this field
                // when the default value is set. This will be removed soon.
                'authConfig.shareBasicAuthCreds': ['true', 'undefined']
              }
            }
          },
          {
            label: '',
            messageTemplate: `**Where do I get my firebase credentials and allow access to Superblocks?** [Superblocks - Firebase Docs](https://docs.superblocks.com/integrations/authenticating-apis/authenticate-using-firebase-auth)\\
Note: REST APIs authenticated with firebase cannot be used in Superblocks Workflows & Scheduled Jobs since both can be called headlessly without user interaction.`,
            name: 'FirebaseAlert',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.ALERT,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.FIREBASE]
              }
            }
          },
          {
            label: 'API Config',
            name: 'authConfig.apiKey',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            tooltip: {
              markdownText: `The API Config can be found through the Firebase
            portal. It's used to identify your app to Firebase.`
            },
            placeholder: `{
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}
            `,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.FIREBASE]
              }
            }
          },
          {
            label: 'Enable login with Email/Password',
            name: 'authConfig.email',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.CHECKBOX,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.FIREBASE]
              }
            },
            initialValue: true
          },
          {
            label: 'Enable login with Google',
            name: 'authConfig.google',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.CHECKBOX,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.FIREBASE]
              }
            }
          },
          {
            label: '',
            messageTemplate: `Use **{{firebase.token}}** below to refer to the firebase
            authentication token & use **{{firebase.userId}}** to refer to the
            currently authenticated user's ID.`,
            name: 'FirebaseAlert',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.ALERT,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.FIREBASE]
              }
            }
          },
          {
            label: '',
            messageTemplate: `The Implicit OAuth 2.0 flow can be used to migrate off of
            Single Page Apps if you can't use the Authorization Code flow.`,
            name: 'AuthCodeExplanation',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.ALERT,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.OAUTH2_IMPLICIT]
              }
            }
          },
          {
            label: 'Authorization URL',
            name: 'authConfig.authorizationUrl',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            rules: [{ required: true, message: 'Authorization URL is required' }],
            tooltip: {
              markdownText: `The full URL path to the authorization server that
            allows the user to authorize the app the requested permissions.`
            },
            singleLine: true,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.OAUTH2_IMPLICIT, RestApiIntegrationAuthType.OAUTH2_CODE]
              }
            },
            placeholder: `https://accounts.google.com/o/oauth2/v2/auth`
          },
          {
            label: 'Token URL',
            name: 'authConfig.tokenUrl',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            rules: [{ required: true, message: 'Token URL is required' }],
            tooltip: {
              markdownText: `The full URL path to the token endpoint that serves OAuth tokens.`
            },
            singleLine: true,
            display: {
              show: {
                authType: [
                  RestApiIntegrationAuthType.OAUTH2_PASSWORD,
                  RestApiIntegrationAuthType.OAUTH2_CLIENT_CREDS,
                  RestApiIntegrationAuthType.OAUTH2_CODE
                ]
              }
            },
            placeholder: `https://oauth2.googleapis.com/token`
          },
          {
            label: 'Client ID',
            name: 'authConfig.clientId',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: `my-client-id`,
            rules: [{ required: true, message: 'Client ID is required' }],
            tooltip: {
              markdownText: `A public identifier used to identify this client
            to the authorization/token servers.`
            },
            singleLine: true,
            display: {
              show: {
                authType: [
                  RestApiIntegrationAuthType.OAUTH2_PASSWORD,
                  RestApiIntegrationAuthType.OAUTH2_CLIENT_CREDS,
                  RestApiIntegrationAuthType.OAUTH2_IMPLICIT,
                  RestApiIntegrationAuthType.OAUTH2_CODE
                ]
              }
            }
          },
          {
            label: 'Client Secret',
            name: 'authConfig.clientSecret',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            rules: [{ required: true, message: 'Client Secret is required' }],
            placeholder: `my-client-secret`,
            dataType: InputDataType.PASSWORD,
            tooltip: {
              markdownText: `A secret shared between the client and the
            authorizing/token servers to verify the client ID.`
            },
            singleLine: true,
            display: {
              show: {
                authType: [
                  RestApiIntegrationAuthType.OAUTH2_PASSWORD,
                  RestApiIntegrationAuthType.OAUTH2_CLIENT_CREDS,
                  RestApiIntegrationAuthType.OAUTH2_CODE
                ]
              }
            }
          },
          {
            label: 'Scope(s)',
            name: 'authConfig.scope',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: `openid email`,
            tooltip: {
              markdownText: `A space-separated list of permissions to be requested.`
            },
            singleLine: true,
            display: {
              show: {
                authType: [
                  RestApiIntegrationAuthType.OAUTH2_CLIENT_CREDS,
                  RestApiIntegrationAuthType.OAUTH2_IMPLICIT,
                  RestApiIntegrationAuthType.OAUTH2_CODE
                ]
              }
            }
          },
          {
            label: 'Share username/password across all users',
            name: 'authConfig.useFixedPasswordCreds',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.CHECKBOX,
            tooltip: {
              markdownText: `Optionally provide a username and password for all
            end-users. If not selected, the end-user will be prompted to submit
            their credentials.`
            },
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.OAUTH2_PASSWORD]
              }
            },
            initialValue: false
          },
          {
            label: 'Username',
            name: 'authConfig.username',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: `username`,
            singleLine: true,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.OAUTH2_PASSWORD],
                'authConfig.useFixedPasswordCreds': ['true']
              }
            }
          },
          {
            label: 'Password',
            name: 'authConfig.password',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            placeholder: `password`,
            dataType: InputDataType.PASSWORD,
            singleLine: true,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.OAUTH2_PASSWORD],
                'authConfig.useFixedPasswordCreds': ['true']
              }
            }
          },
          {
            label: '',
            messageTemplate: 'Allow-list the Superblocks OAuth callback/redirect URI: `https://app.superblockshq.com/oauth/callback`',
            name: 'oauth-callback-alert',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.ALERT,
            display: {
              show: {
                authType: [RestApiIntegrationAuthType.OAUTH2_CODE, RestApiIntegrationAuthType.OAUTH2_IMPLICIT]
              }
            }
          },
          {
            label: '',
            messageTemplate:
              'Use **{{oauth.token}}** below to refer to the OAuth authentication token. It is typically used in a header: `Authorization: Bearer {{oauth.token}}`',
            name: 'OAuth2PasswordAlert',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.ALERT,
            display: {
              show: {
                authType: [
                  RestApiIntegrationAuthType.OAUTH2_PASSWORD,
                  RestApiIntegrationAuthType.OAUTH2_CLIENT_CREDS,
                  RestApiIntegrationAuthType.OAUTH2_IMPLICIT,
                  RestApiIntegrationAuthType.OAUTH2_CODE
                ]
              }
            }
          }
        ]
      },
      {
        name: 'tabs',
        layout: FormSectionLayout.TABS,
        items: [
          {
            name: RestApiIntegrationPluginMergedFieldNames.HEADERS,
            label: 'Headers',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.FIELD_LIST,
            secretsNames: ['Authorization']
          },
          {
            name: RestApiIntegrationPluginMergedFieldNames.PARAMS,
            label: 'Params',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.FIELD_LIST
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
            name: RestApiFields.HTTP_METHOD,
            label: getRestApiFieldDisplayName(RestApiFields.HTTP_METHOD),
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.DROPDOWN,
            initialValue: HttpMethod.GET,
            rules: [{ required: true }],
            options: [
              {
                key: HttpMethod.GET,
                value: HttpMethod.GET
              },
              {
                key: HttpMethod.POST,
                value: HttpMethod.POST
              },
              {
                key: HttpMethod.PUT,
                value: HttpMethod.PUT
              },
              {
                key: HttpMethod.DELETE,
                value: HttpMethod.DELETE
              },
              {
                key: HttpMethod.PATCH,
                value: HttpMethod.PATCH
              }
            ]
          },
          {
            name: RestApiFields.URL_BASE,
            label: getRestApiFieldDisplayName(RestApiFields.URL_BASE),
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.INPUT_TEXT,
            disabled: true
          },
          {
            name: RestApiFields.URL_PATH,
            label: getRestApiFieldDisplayName(RestApiFields.URL_PATH),
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
            placeholder: '/v1/users'
          }
        ]
      },
      {
        name: 'auth',
        items: [
          {
            name: RestApiFields.AUTH_TYPE,
            label: getRestApiFieldDisplayName(RestApiFields.AUTH_TYPE),
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.DROPDOWN,
            disabled: true,
            initialValue: RestApiIntegrationAuthType.NONE,
            options: Object.values(RestApiIntegrationAuthType).map((authType) => ({
              displayName: getDisplayName(authType),
              value: authType,
              key: authType
            }))
          }
        ]
      },
      {
        name: 'tabs',
        layout: FormSectionLayout.TABS,
        items: [
          {
            name: RestApiIntegrationPluginMergedFieldNames.HEADERS,
            label: 'Headers',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.FIELD_LIST
          },
          {
            name: RestApiIntegrationPluginMergedFieldNames.PARAMS,
            label: 'Params',
            startVersion: RestApiIntegrationPluginVersions.V1,
            componentType: FormComponentType.FIELD_LIST
          },
          {
            name: RestApiFields.BODY,
            label: getRestApiFieldDisplayName(RestApiFields.BODY),
            startVersion: RestApiIntegrationPluginVersions.V1,
            endVersion: RestApiIntegrationPluginVersions.V7,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON
          },
          {
            name: RestApiFields.BODY_TYPE,
            label: getRestApiFieldDisplayName(RestApiFields.BODY_TYPE),
            startVersion: RestApiIntegrationPluginVersions.V8,
            componentType: FormComponentType.DROPDOWN,
            initialValue: RestApiBodyDataType.JSON,
            options: Object.values(RestApiBodyDataType).map((bodyType) => ({
              displayName: getRestApiDataTypeDisplayName(bodyType),
              value: bodyType,
              key: bodyType
            }))
          },
          {
            name: RestApiFields.BODY,
            label: getRestApiBodyLabel(RestApiBodyDataType.JSON),
            startVersion: RestApiIntegrationPluginVersions.V8,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JSON,
            display: {
              show: {
                bodyType: [RestApiBodyDataType.JSON]
              }
            }
          },
          {
            name: RestApiFields.BODY,
            label: getRestApiBodyLabel(RestApiBodyDataType.RAW),
            startVersion: RestApiIntegrationPluginVersions.V8,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.TEXT,
            display: {
              show: {
                bodyType: [RestApiBodyDataType.RAW]
              }
            }
          },
          {
            name: RestApiFields.FORM_DATA,
            label: getRestApiBodyLabel(RestApiBodyDataType.FORM),
            startVersion: RestApiIntegrationPluginVersions.V8,
            componentType: FormComponentType.FIELD_LIST_FORM,
            display: {
              show: {
                bodyType: [RestApiBodyDataType.FORM]
              }
            }
          },
          {
            name: RestApiFields.FILE_FORM_KEY,
            label: getRestApiFieldDisplayName(RestApiFields.FILE_FORM_KEY),
            startVersion: RestApiIntegrationPluginVersions.V8,
            componentType: FormComponentType.INPUT_TEXT,
            initialValue: 'file',
            display: {
              show: {
                bodyType: [RestApiBodyDataType.FILE_FORM]
              }
            }
          },
          {
            name: RestApiFields.FILE_NAME,
            label: getRestApiFieldDisplayName(RestApiFields.FILE_NAME),
            startVersion: RestApiIntegrationPluginVersions.V8,
            componentType: FormComponentType.INPUT_TEXT,
            display: {
              show: {
                bodyType: [RestApiBodyDataType.FILE_FORM]
              }
            }
          },
          {
            name: RestApiFields.BODY,
            label: getRestApiBodyLabel(RestApiBodyDataType.FILE_FORM),
            startVersion: RestApiIntegrationPluginVersions.V8,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.TEXT,
            display: {
              show: {
                bodyType: [RestApiBodyDataType.FILE_FORM]
              }
            }
          }
        ]
      }
    ]
  }
};
