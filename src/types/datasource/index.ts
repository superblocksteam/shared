import { Property } from '../common/property';
import { Plugin, PluginMetadata } from '../plugin';
import { AuthConfig, AuthContext, AuthId, AuthType, getAuthId, PublicAuthConfig, RestApiIntegrationAuthType } from './auth';

// The DTO for the full datasource (ie all fields). This should only be visible
// to users that can configure the datasource.
export class DatasourceDto {
  id: string;
  name: string;
  pluginId?: string;
  pluginName?: string;
  organizationId?: string;
  configuration?: DatasourceConfiguration;
  configurationProd?: DatasourceConfiguration;
  configurationStaging?: DatasourceConfiguration;
  isDefault?: boolean;
  // TODO clean up this field from the FE
  invalids?: string[];
  authContext?: AuthContext;
  creator?: {
    id: string;
    name: string;
  };
  demoIntegrationId?: string;
  ownerEmail?: string;
  error?: string;

  constructor(datasource: DatasourceDto, ownerEmail?: string) {
    this.id = datasource.id;
    this.name = datasource.name;
    this.pluginId = datasource.pluginId;
    this.organizationId = datasource.organizationId;
    this.demoIntegrationId = datasource.demoIntegrationId;
    this.configuration = datasource.configurationProd;
    this.configurationProd = datasource.configurationProd;
    this.configurationStaging = datasource.configurationStaging;
    this.isDefault = datasource.isDefault;
    this.ownerEmail = ownerEmail;
    this.invalids = [];
  }
}

// ViewDatasourceDto is just the information needed to use a datasource to
// create steps of that type. Credentials are explicitly excluded - those should
// only be needed to execute the step.
export class ViewDatasourceDto {
  id: string;
  name: string;
  pluginId?: string;
  organizationId?: string;
  isDefault?: boolean;
  readOnly: boolean;
  ownerEmail?: string;

  constructor(datasource: DatasourceDto, readOnly: boolean, ownerEmail?: string) {
    this.id = datasource.id;
    this.name = datasource.name;
    this.pluginId = datasource.pluginId;
    this.organizationId = datasource.organizationId;
    this.isDefault = datasource.isDefault;
    this.readOnly = readOnly;
    this.ownerEmail = ownerEmail;
  }
}

// AuthDatasourceDto is just the information that's needed to authenticate with
// a datasource on the front-end. Sensitive secrets that the browser cannot be
// trusted with should not be present. All users that can run a datasource will
// be able to see the values of this DTO via the Network tab in their browser
// debug console for example.
export class AuthDatasourceDto extends ViewDatasourceDto {
  configurationProd?: PublicRestApiDatasourceConfiguration;
  configurationStaging?: PublicRestApiDatasourceConfiguration;

  constructor(datasource: DatasourceDto) {
    // We don't care about read only status here.
    super(datasource, true /* isReadOnly */);
    this.configurationProd = datasource.configurationProd as PublicRestApiDatasourceConfiguration;
    this.configurationStaging = datasource.configurationStaging as PublicRestApiDatasourceConfiguration;
  }
}

export function getAuthIdFromConfig(datasourceId: string, config: RestApiIntegrationDatasourceConfiguration): AuthId {
  if (config.authType) {
    return getAuthId(config.authType, config.authConfig, datasourceId);
  }

  return 'empty-auth-type';
}

export type BaseDatasourceConfiguration = PluginMetadata & {
  name?: string;
  dynamicWorkflowConfiguration?: {
    enabled?: boolean;
    workflowId?: string;
  };
};

// Use this aliased typed for default datasources only. For all other
// datasources, use BaseDatasourceConfiguration.
export type DefaultDatasourceConfiguration = BaseDatasourceConfiguration;

export type LanguageDatasourceConfiguration = DefaultDatasourceConfiguration;

export interface DBAuthentication {
  authentication?: {
    custom?: {
      databaseName?: Property;
    };
    username?: string;
    password?: string;
  };
}

export type DBDatasourceConfiguration = BaseDatasourceConfiguration & {
  endpoint?: {
    host?: string;
    /**
     * @type integer
     * @minimum 0
     * @maximum 65536
     */
    port?: number;
  };
};

export interface DBConnection {
  connection?: {
    useSsl?: FakeBoolean;
    useSelfSignedSsl?: FakeBoolean;
    ca?: string;
    key?: string;
    cert?: string;
    // This field is set on the demo postgres
    mode?: 0;
  };
}

export type AWSDatasourceConfiguration = BaseDatasourceConfiguration & {
  authentication?: {
    [key: string]: unknown;
    custom?: {
      region?: Property;
      accessKeyID?: Property;
      secretKey?: Property;
    };
  };
};

export type BigqueryDatasourceConfiguration = BaseDatasourceConfiguration & {
  authentication?: {
    custom?: {
      googleServiceAccount?: Property;
    };
  };
};

export type DynamoDBDatasourceConfiguration = AWSDatasourceConfiguration;

export type EmailDatasourceConfiguration = BaseDatasourceConfiguration & {
  authentication?: {
    custom?: {
      apiKey?: Property;
      senderEmail?: Property;
      senderName?: Property;
    };
  };
};

export type GraphQLDatasourceConfiguration = BaseDatasourceConfiguration & {
  path?: string;
  headers?: Property[];
};

export type JavascriptDatasourceConfiguration = LanguageDatasourceConfiguration;

export type MariaDBDatasourceConfiguration = DBDatasourceConfiguration & DBConnection & DBAuthentication;

export type MongoDBDatasourceConfiguration = DBDatasourceConfiguration & DBConnection & DBAuthentication;

export type MySQLDatasourceConfiguration = DBDatasourceConfiguration & DBConnection & DBAuthentication;

// This type exists for two reasons:
// 1. Integration forms sometimes use "checked" instead of a boolean
// 2. Our schema generator requires a named type for unions like this
type FakeBoolean = boolean | string;

export type PostgresDatasourceConfiguration = DBDatasourceConfiguration & DBConnection & DBAuthentication;

export type PythonDatasourceConfiguration = LanguageDatasourceConfiguration;

export type RedshiftDatasourceConfiguration = DBDatasourceConfiguration &
  DBConnection & {
    authentication?: {
      custom?: {
        databaseName?: Property;
        databaseSchema?: Property;
      };
      username?: string;
      password?: string;
    };
  };

// This is the only datasource config for now that's supported for FE auth.
export type PublicRestApiDatasourceConfiguration = {
  authType?: RestApiIntegrationAuthType;
  publicAuthConfig?: PublicAuthConfig;
};

export type RestApiDatasourceConfiguration = BaseDatasourceConfiguration & {
  urlBase?: string;
  params?: Property[];
  headers?: Property[];
  authType?: AuthType;
  // If the user switches between two authTypes, some older authConfigs will remain
  // in the persisted state. This should not fail validation.
  authConfig?: AuthConfig;

  // This is part of the in-memory form, not persisted
  AuthCodeExplanation?: string;
  FirebaseAlert?: string;
  HTTPBasicAlert?: string;
  'oauth-callback-alert'?: string;
  OAuth2PasswordAlert?: string;
};

export type RestApiIntegrationDatasourceConfiguration = RestApiDatasourceConfiguration;

export type S3DatasourceConfiguration = AWSDatasourceConfiguration;

export type SnowflakeDatasourceConfiguration = DBDatasourceConfiguration &
  DBConnection & {
    authentication?: {
      username?: string;
      password?: string;
      custom?: {
        databaseName?: Property;
        account?: Property;
        warehouse?: Property;
        schema?: Property;
        role?: Property;
      };
    };
  };

export type MsSqlDatasourceConfiguration = DBDatasourceConfiguration & DBConnection & DBAuthentication;

export type RocksetDatasourceConfiguration = BaseDatasourceConfiguration & {
  apiKey: string;
};

export type WorkflowDatasourceConfiguration = BaseDatasourceConfiguration;

export type GoogleSheetsDatasourceConfiguration = DefaultDatasourceConfiguration & {
  authType?: AuthType;
  authConfig?: AuthConfig;
  // This is part of the in-memory form, not persisted
  OAuth2ConnectedAlert?: string;
};

export type DatasourceConfiguration =
  | BigqueryDatasourceConfiguration
  | DynamoDBDatasourceConfiguration
  | EmailDatasourceConfiguration
  | GraphQLDatasourceConfiguration
  | JavascriptDatasourceConfiguration
  | MariaDBDatasourceConfiguration
  | MongoDBDatasourceConfiguration
  | MySQLDatasourceConfiguration
  | PostgresDatasourceConfiguration
  | PythonDatasourceConfiguration
  | RedshiftDatasourceConfiguration
  | RestApiDatasourceConfiguration
  | RestApiIntegrationDatasourceConfiguration
  | S3DatasourceConfiguration
  | SnowflakeDatasourceConfiguration
  | WorkflowDatasourceConfiguration
  | MsSqlDatasourceConfiguration
  | RocksetDatasourceConfiguration
  | GoogleSheetsDatasourceConfiguration;

export type DatasourceConfigurationByType = {
  bigquery?: BigqueryDatasourceConfiguration;
  dynamodb?: DynamoDBDatasourceConfiguration;
  email?: EmailDatasourceConfiguration;
  graphqlintegration?: GraphQLDatasourceConfiguration;
  graphql?: GraphQLDatasourceConfiguration;
  javascript?: JavascriptDatasourceConfiguration;
  mariadb?: MariaDBDatasourceConfiguration;
  mongodb?: MongoDBDatasourceConfiguration;
  mysql?: MySQLDatasourceConfiguration;
  postgres?: PostgresDatasourceConfiguration;
  python?: PythonDatasourceConfiguration;
  redshift?: RedshiftDatasourceConfiguration;
  restapi?: RestApiDatasourceConfiguration;
  restapiintegration?: RestApiIntegrationDatasourceConfiguration;
  s3?: S3DatasourceConfiguration;
  snowflake?: SnowflakeDatasourceConfiguration;
  workflow?: WorkflowDatasourceConfiguration;
  mssql?: MsSqlDatasourceConfiguration;
  rockset?: RocksetDatasourceConfiguration;
  gsheets?: GoogleSheetsDatasourceConfiguration;
};

export enum DatasourceEnvironments {
  PRODUCTION = 'Production',
  STAGING = 'Staging'
}

export const ENVIRONMENT_PRODUCTION = 'production';
export const ENVIRONMENT_STAGING = 'staging';
export const ENVIRONMENT_ALL = '*';

export const VALID_DATASOURCE_ENVIRONMENTS = [ENVIRONMENT_PRODUCTION, ENVIRONMENT_STAGING, ENVIRONMENT_ALL];

export enum DatasourceSource {
  LOCAL = 'LOCAL', // Source the configs from the DatasourceEntity table
  DEMO = 'DEMO' // Source the configs from Demo Integrations table
}

export type Integration = {
  datasource: DatasourceDto;
  plugin: Plugin;
};

export * from './metadata';
export * from './test';
export * from './auth';
