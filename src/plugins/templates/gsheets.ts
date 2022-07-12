/* eslint-disable no-useless-escape */
import {
  EditorLanguage,
  FormComponentType,
  GoogleSheetsAuthType,
  GoogleSheetsDatasourceConfiguration,
  Plugin,
  PluginResponseType,
  PluginType,
  TokenScope
} from '../../types';
import { SERVICE_ACCOUNT_GHOST_TEXT } from './constants';

export const GoogleSheetsPluginVersions = {
  V1: '0.0.1',
  V2: '0.0.2',
  V3: '0.0.3',
  V4: '0.0.4',
  V5: '0.0.5',
  V6: '0.0.6',
  V7: '0.0.7'
};

export enum GoogleSheetsFormatType {
  EFFECTIVE_VALUE = 'EFFECTIVE_VALUE',
  USER_ENTERED_VALUE = 'USER_ENTERED_VALUE',
  FORMATTED_VALUE = 'FORMATTED_VALUE'
}

export enum GoogleSheetsActionType {
  READ_SPREADSHEET = 'READ_SPREADSHEET',
  READ_SPREADSHEET_RANGE = 'READ_SPREADSHEET_RANGE',
  APPEND_SPREADSHEET = 'APPEND_SPREADSHEET'
}

export const GOOGLE_SHEETS_ACTION_DISPLAY_NAMES: Record<GoogleSheetsActionType, string> = {
  [GoogleSheetsActionType.READ_SPREADSHEET]: 'Read the whole spreadsheet',
  [GoogleSheetsActionType.READ_SPREADSHEET_RANGE]: 'Read from a range (e.g. A1:D100)',
  [GoogleSheetsActionType.APPEND_SPREADSHEET]: 'Append rows to the spreadsheet'
};

export const GOOGLE_SHEETS_PLUGIN_ID = 'gsheets';

export const GOOGLE_SHEETS_FORMAT_DISPLAY_NAMES: Record<GoogleSheetsFormatType, string> = {
  [GoogleSheetsFormatType.EFFECTIVE_VALUE]: 'Effective value',
  [GoogleSheetsFormatType.FORMATTED_VALUE]: 'Formatted value',
  [GoogleSheetsFormatType.USER_ENTERED_VALUE]: 'User entered value'
};

export enum GOOGLE_SHEETS_SCOPE {
  READ = 'email https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/userinfo.email openid',
  WRITE = 'email https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email openid'
}

export const getGsheetsAuthDisplayName = (authType: GoogleSheetsAuthType): string => {
  switch (authType) {
    case GoogleSheetsAuthType.OAUTH2_CODE:
      return 'Connect using Google Account';
    case GoogleSheetsAuthType.SERVICE_ACCOUNT:
      return 'Connect using Service Account';
    default:
      return 'None';
  }
};

export const GoogleSheetsPlugin = (googleSheetsClientId: string, redirectPath: string): Plugin => {
  return {
    id: GOOGLE_SHEETS_PLUGIN_ID,
    name: 'Google Sheets',
    moduleName: 'GoogleSheetsPlugin',
    modulePath: 'plugins/gsheets/GoogleSheetsPlugin',
    iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/gsheets.png',
    type: PluginType.API,
    responseType: PluginResponseType.TABLE,
    hasRawRequest: false,
    hasTest: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    preCreateValidate: (integrationCreated: boolean, values: GoogleSheetsDatasourceConfiguration): string | undefined => {
      if (values.authType === 'oauth-code' && !integrationCreated) {
        return 'Please connect your Google account first';
      }
    },
    datasourceTemplate: {
      sections: [
        {
          name: 'main',
          items: [
            {
              label: 'Display Name',
              name: 'name',
              startVersion: GoogleSheetsPluginVersions.V1,
              componentType: FormComponentType.INPUT_TEXT,
              rules: [{ required: true, message: 'Display Name is required' }]
            },
            {
              label: 'Authentication',
              name: 'authType',
              startVersion: GoogleSheetsPluginVersions.V1,
              endVersion: GoogleSheetsPluginVersions.V3,
              componentType: FormComponentType.INPUT_TEXT,
              initialValue: GoogleSheetsAuthType.OAUTH2_CODE,
              hidden: true
            },
            {
              label: 'Token',
              name: 'authToken',
              startVersion: GoogleSheetsPluginVersions.V1,
              endVersion: GoogleSheetsPluginVersions.V3,
              componentType: FormComponentType.INPUT_TEXT,
              initialValue: '{{oauth.token}}',
              hidden: true
            }
          ]
        },
        {
          name: 'auth',
          borderThreshold: 1,
          items: [
            {
              label: 'Authentication',
              name: 'authType',
              startVersion: GoogleSheetsPluginVersions.V4,
              componentType: FormComponentType.DROPDOWN,
              initialValue: GoogleSheetsAuthType.OAUTH2_CODE,
              options: Object.values(GoogleSheetsAuthType).map((authType) => ({
                displayName: getGsheetsAuthDisplayName(authType),
                value: authType,
                key: authType
              })),
              immutable: true
            },
            {
              label: 'Access level',
              name: 'authConfig.scope',
              startVersion: GoogleSheetsPluginVersions.V1,
              componentType: FormComponentType.RADIO,
              initialValue: GOOGLE_SHEETS_SCOPE.WRITE,
              options: [
                {
                  key: GOOGLE_SHEETS_SCOPE.WRITE,
                  value: GOOGLE_SHEETS_SCOPE.WRITE,
                  displayName: 'Read and write'
                },
                {
                  key: GOOGLE_SHEETS_SCOPE.READ,
                  value: GOOGLE_SHEETS_SCOPE.READ,
                  displayName: 'Read only'
                }
              ],
              rules: [{ required: true, message: 'Access level is required' }],
              immutable: true
            },
            {
              label: 'Connect to Google account',
              name: 'authConfig.hasToken',
              startVersion: GoogleSheetsPluginVersions.V1,
              componentType: FormComponentType.CUSTOM_COMPONENT,
              childComponentType: FormComponentType.CONNECT_OAUTH_BUTTON,
              childComponentsProperties: {
                href: `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=$\{authConfig.scope\}&response_type=code&client_id=${googleSheetsClientId}&state=$\{state\}&redirect_uri=$\{state.origin\}${redirectPath}`,
                target: '_blank',
                iconUrl: 'https://superblocks.s3.us-west-2.amazonaws.com/img/integrations/google-login.svg'
              },
              display: {
                show: {
                  authType: [GoogleSheetsAuthType.OAUTH2_CODE],
                  'authConfig.hasToken': ['false']
                }
              },
              initialValue: false
            },
            {
              label: '',
              name: 'OAuth2ConnectedAlert',
              startVersion: GoogleSheetsPluginVersions.V1,
              endVersion: GoogleSheetsPluginVersions.V6,
              componentType: FormComponentType.ALERT,
              text: 'You are connected to Google Sheets!',
              type: 'success',
              showIcon: true,
              display: {
                show: {
                  authType: [GoogleSheetsAuthType.OAUTH2_CODE],
                  'authConfig.hasToken': ['true']
                }
              }
            },
            {
              label: '',
              name: 'OAuth2ConnectedAlert',
              startVersion: GoogleSheetsPluginVersions.V7,
              componentType: FormComponentType.CUSTOM_COMPONENT,
              childComponentType: FormComponentType.ALERT,
              childComponentsProperties: {
                text: `You are connected to Google Sheets as $\{authConfig.userEmail\}!`,
                type: 'success',
                showIcon: true
              },
              display: {
                show: {
                  'authConfig.hasToken': ['true']
                }
              }
            },
            {
              label: 'Refresh token from the server side?',
              name: 'authConfig.refreshTokenFromServer',
              startVersion: GoogleSheetsPluginVersions.V1,
              componentType: FormComponentType.INPUT_TEXT,
              initialValue: true,
              hidden: true
            },
            {
              label: 'Token scope(per datasource/per user/etc)',
              name: 'authConfig.tokenScope',
              startVersion: GoogleSheetsPluginVersions.V1,
              componentType: FormComponentType.INPUT_TEXT,
              initialValue: TokenScope.DATASOURCE,
              hidden: true
            },
            {
              label: 'Service Account Key',
              name: 'authConfig.googleServiceAccount.value',
              startVersion: GoogleSheetsPluginVersions.V4,
              componentType: FormComponentType.CODE_EDITOR,
              language: EditorLanguage.JSON,
              placeholder: SERVICE_ACCOUNT_GHOST_TEXT,
              rules: [{ required: true, message: 'Service Account Key is required' }],
              display: {
                show: {
                  authType: [GoogleSheetsAuthType.SERVICE_ACCOUNT]
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
              label: 'Action',
              name: 'action',
              startVersion: GoogleSheetsPluginVersions.V1,
              componentType: FormComponentType.DROPDOWN,
              initialValue: GoogleSheetsActionType.READ_SPREADSHEET,
              rules: [{ required: true }],
              options: [
                {
                  key: GoogleSheetsActionType.READ_SPREADSHEET,
                  value: GoogleSheetsActionType.READ_SPREADSHEET,
                  displayName: GOOGLE_SHEETS_ACTION_DISPLAY_NAMES[GoogleSheetsActionType.READ_SPREADSHEET]
                },
                {
                  key: GoogleSheetsActionType.READ_SPREADSHEET_RANGE,
                  value: GoogleSheetsActionType.READ_SPREADSHEET_RANGE,
                  displayName: GOOGLE_SHEETS_ACTION_DISPLAY_NAMES[GoogleSheetsActionType.READ_SPREADSHEET_RANGE]
                },
                {
                  key: GoogleSheetsActionType.APPEND_SPREADSHEET,
                  value: GoogleSheetsActionType.APPEND_SPREADSHEET,
                  displayName: GOOGLE_SHEETS_ACTION_DISPLAY_NAMES[GoogleSheetsActionType.APPEND_SPREADSHEET]
                }
              ]
            },
            {
              label: 'Spreadsheet',
              name: 'spreadsheetId',
              startVersion: GoogleSheetsPluginVersions.V1,
              componentType: FormComponentType.METADATA_DROPDOWN,
              accessorPath: 'dbSchema.tables',
              keyAccessor: 'id',
              valueAccessor: 'id',
              displayNameAccessor: 'name',
              triggerGetMetadata: true,
              display: {
                show: {
                  action: [
                    GoogleSheetsActionType.READ_SPREADSHEET,
                    GoogleSheetsActionType.READ_SPREADSHEET_RANGE,
                    GoogleSheetsActionType.APPEND_SPREADSHEET
                  ]
                }
              },
              rules: [{ required: true, message: 'Spreadsheet is required' }],
              showSearch: true,
              optionFilterProp: 'label'
            },
            {
              label: 'Sheet name',
              name: 'sheetTitle',
              startVersion: GoogleSheetsPluginVersions.V1,
              componentType: FormComponentType.METADATA_DROPDOWN,
              accessorPath: 'dbSchema.tables',
              predicateAccessorPath: 'id',
              dependencyFieldName: 'spreadsheetId',
              childIteratorAccessor: 'columns',
              keyAccessor: 'name',
              valueAccessor: 'name',
              displayNameAccessor: 'name',
              display: {
                show: {
                  action: [
                    GoogleSheetsActionType.READ_SPREADSHEET,
                    GoogleSheetsActionType.READ_SPREADSHEET_RANGE,
                    GoogleSheetsActionType.APPEND_SPREADSHEET
                  ]
                }
              },
              rules: [{ required: true, message: 'Sheet is required' }],
              showSearch: true,
              optionFilterProp: 'label'
            },
            {
              label: 'Use Row 1 of the sheet as the Table Header',
              name: 'extractFirstRowHeader',
              startVersion: GoogleSheetsPluginVersions.V1,
              componentType: FormComponentType.CHECKBOX,
              initialValue: true,
              display: {
                show: {
                  action: [GoogleSheetsActionType.READ_SPREADSHEET, GoogleSheetsActionType.READ_SPREADSHEET_RANGE]
                }
              },
              tooltip: {
                markdownText: 'Use Row 1 of the sheet as the Table Header'
              }
            },
            {
              label: 'Data range',
              name: 'range',
              startVersion: GoogleSheetsPluginVersions.V1,
              componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
              initialValue: 'A1:D100',
              display: {
                show: {
                  action: [GoogleSheetsActionType.READ_SPREADSHEET_RANGE]
                }
              },
              tooltip: {
                markdownText: 'Range of cells to read from'
              }
            },
            {
              label: 'Rows to append',
              name: 'data',
              startVersion: GoogleSheetsPluginVersions.V2,
              componentType: FormComponentType.CODE_EDITOR,
              language: EditorLanguage.JSON,
              placeholder: `[
  {
    "name": "Billie Eilish",
    "email": "bad_guy@gmail.com",
    "date_joined": "2019-01-06"
  },
  {
    "name": "Katy Perry",
    "email": "kaycat@hotmail.com",
    "date_joined": "2019-01-06"
  }
]`,
              style: {
                minHeight: '350px'
              },
              display: {
                show: {
                  action: [GoogleSheetsActionType.APPEND_SPREADSHEET]
                }
              },
              tooltip: {
                markdownText:
                  'Append rows at the end of the spreadsheet. [See an example in docs](https://docs.superblocks.com/integrations/connect-integrations/google-sheets)'
              },
              rules: [{ required: true, message: 'Rows to append are required' }]
            }
          ]
        }
      ]
    }
  };
};
