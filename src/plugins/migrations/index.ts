import { cloneDeep } from 'lodash';
import { ActionConfiguration, DatasourceConfiguration, RestApiBodyDataType, RestApiFields, SemVer } from '../../types';
import { RestApiIntegrationPluginVersions, RestApiPluginVersions } from '../templates';

export type DatasourceAndActionMigration = {
  datasourceMigration: (datasourceConfiguration: DatasourceConfiguration) => DatasourceConfiguration;
  actionMigration: (actionConfiguration: ActionConfiguration) => ActionConfiguration;
};

// Map from plugin version to plugin migrations
export type VersionedMigrations = {
  upMigrations: Record<SemVer, DatasourceAndActionMigration>;
  downMigrations: Record<SemVer, DatasourceAndActionMigration>;
};

export const bigQueryPluginMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

export const dynamoDBPluginMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

export const emailPluginMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

export const graphQLPluginMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

export const javascriptPluginMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

export const mariaDBPluginMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

export const mongoDBPluginMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

export const mySQLPluginMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

export const postgresPluginMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

export const pythonPluginMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

export const redshiftPluginMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

const migrateRestApiV8: DatasourceAndActionMigration = {
  datasourceMigration: (configuration: DatasourceConfiguration): DatasourceConfiguration => {
    // No change
    console.log('no-op for RestApi datasource upmigrate v8');
    return configuration;
  },
  actionMigration: (configuration: ActionConfiguration): ActionConfiguration => {
    const cloned = cloneDeep(configuration);
    console.log('running for RestApi action upmigrate v8');
    cloned[RestApiFields.BODY_TYPE] = RestApiBodyDataType.JSON;
    return cloned;
  }
};

export const restApiPluginMigrations: VersionedMigrations = {
  upMigrations: {
    [RestApiPluginVersions.V8]: migrateRestApiV8
  },
  downMigrations: {}
};

export const restApiIntegrationPluginMigrations: VersionedMigrations = {
  upMigrations: {
    [RestApiIntegrationPluginVersions.V8]: migrateRestApiV8
  },
  downMigrations: {}
};

export const s3PluginMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

export const snowflakeMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};

export const workflowMigrations: VersionedMigrations = {
  upMigrations: {},
  downMigrations: {}
};
