import { GoogleSheetsFormatType } from '../../plugins';
import { Property } from '../common/property';
import { RestApiIntegrationAuthType } from '../datasource';
import { PluginMetadata, RestApiBodyDataType } from '../plugin';
import { ApiDetails } from '.';

export type Action = {
  id: ActionId;
  name: string;
  type: ActionType;
  configuration: ActionConfiguration;
  applicationId?: string;
  pluginId: string;
  datasourceId?: string;
  settings?: ActionSettings;
  children?: {
    [key: string]: ActionId;
  };
};

export type GoogleSheetsActionConfiguration = {
  spreadsheetId?: string;
  sheetTitle?: string;
  range?: string;
  extractFirstRowHeader?: boolean;
  format?: GoogleSheetsFormatType;
  data?: string;
};

export type DBActionConfiguration = {
  body?: string;
  usePreparedSql?: boolean;
};

export type BigqueryActionConfiguration = DBActionConfiguration;

export type DynamoDBActionConfiguration = DBActionConfiguration & {
  action?: string;
};

export type EmailActionConfiguration = {
  emailFrom?: string;
  emailTo?: string;
  emailCc?: string;
  emailBcc?: string;
  emailSubject?: string;
  emailBody?: string;
  emailAttachments?: string;
};

export type GraphQLActionConfiguration = {
  path?: string;
  headers?: Property[];
  body?: string;
  custom?: {
    variables: Property;
  };
};

export type JavascriptActionConfiguration = {
  body?: string;
};

export type MariaDBActionConfiguration = DBActionConfiguration;

export type MongoDBActionConfiguration = {
  resource?: string;
  action?: string;
  pipeline?: string;
  projection?: string;
  query?: string;
  field?: string;
  sortby?: string;
  limit?: number;
  skip?: number;
  document?: string;
  replacement?: string;
  filter?: string;
  options?: string;
  update?: string;
  distinctKey?: string;
};

export type MySQLActionConfiguration = DBActionConfiguration;

export type PostgresActionConfiguration = DBActionConfiguration;

export type PythonActionConfiguration = {
  body?: string;
};

export type RedshiftActionConfiguration = DBActionConfiguration;

type RestApiCommonActionConfiguration = {
  httpMethod?: HttpMethod;
  headers?: Property[];
  params?: Property[];
  bodyType?: RestApiBodyDataType;
  body?: string;
  formData?: Property[];
  fileFormKey?: string;
  fileName?: string;
};

export type RestApiActionConfiguration = RestApiCommonActionConfiguration & {
  path?: string;
};

export type RestApiIntegrationActionConfiguration = RestApiCommonActionConfiguration & {
  urlBase?: string;
  urlPath?: string;
  authType?: RestApiIntegrationAuthType;
};

export type S3ActionConfiguration = {
  resource?: string;
  action?: string;
  path?: string;
  body?: string;
  fileObjects?: unknown;
  custom?: {
    presignedExpiration: Property;
  };
};

export type SnowflakeActionConfiguration = DBActionConfiguration;

export type WorkflowActionConfiguration = {
  workflow?: string;
  custom?: Record<string, Property>;
};

export type ApiActionConfiguration = GraphQLActionConfiguration & RestApiActionConfiguration & RestApiIntegrationActionConfiguration;

export type LanguageActionConfiguration = JavascriptActionConfiguration & PythonActionConfiguration;

export type ActionConfiguration = PluginMetadata &
  BigqueryActionConfiguration &
  DynamoDBActionConfiguration &
  EmailActionConfiguration &
  GraphQLActionConfiguration &
  JavascriptActionConfiguration &
  MariaDBActionConfiguration &
  MongoDBActionConfiguration &
  MySQLActionConfiguration &
  PostgresActionConfiguration &
  PythonActionConfiguration &
  RedshiftActionConfiguration &
  RestApiActionConfiguration &
  RestApiIntegrationActionConfiguration &
  S3ActionConfiguration &
  SnowflakeActionConfiguration &
  WorkflowActionConfiguration &
  GoogleSheetsActionConfiguration;

export function getAction(actionId: string, actions: ApiDetails): Action {
  return actions.actions[actionId];
}

export function getActionIds(actions: ApiDetails): string[] {
  return Object.keys(actions.actions);
}

export function getDatasourceIds(actions: ApiDetails): string[] {
  return Object.values(actions.actions)
    .map((action: Action) => action.datasourceId)
    .filter((datasourceId): datasourceId is string => !!datasourceId);
}

export function getPluginIds(actions: ApiDetails): string[] {
  return Object.values(actions.actions).map((action: Action) => action.pluginId);
}

type ActionWithChildren = Pick<Action, Exclude<keyof Action, 'children'>> & {
  children: { [key: string]: ActionId };
};

export function actionHasChild(action: Action): action is ActionWithChildren {
  return Boolean(action.children && Object.keys(action.children).length > 0);
}

export function getChildActionIds(action: Action): ActionId[] {
  return actionHasChild(action) ? Object.values(action.children) : [];
}

export type ActionId = string;

export type ActionSettings = {
  executeOnLoad?: boolean;
  cacheResponse?: string;
  userSetOnLoad?: boolean;
  confirmBeforeExecute?: boolean;
};

export enum ActionType {
  Integration,
  Conditional,
  Loop,
  Assignment
}

export enum HttpMethod {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE'
}

export enum PaginationType {
  NONE,
  PAGE_NO,
  URL
}

export const DB_SQL_INITIAL_TEXT = `-- You can use SQL to query data (ex. SELECT * FROM orders;)

`;
