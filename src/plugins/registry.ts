import { Plugin } from '../types';
import { RocksetPlugin } from './templates';
import { BigQueryPlugin } from './templates/bigquery';
import { DynamoDBPlugin } from './templates/dynamodb';
import { EmailPlugin } from './templates/email';
import { GraphQLPlugin } from './templates/graphql';
import { GoogleSheetsPlugin } from './templates/gsheets';
import { JavascriptPlugin } from './templates/javascript';
import { MariaDBPlugin } from './templates/mariadb';
import { MongoDBPlugin } from './templates/mongodb';
import { MicrosoftSQLPlugin } from './templates/mssql';
import { MySQLPlugin } from './templates/mysql';
import { PostgresPlugin } from './templates/postgres';
import { PythonPlugin } from './templates/python';
import { RedshiftPlugin } from './templates/redshift';
import { RestApiPlugin } from './templates/restApi';
import { RestApiIntegrationPlugin } from './templates/restApiIntegration';
import { S3Plugin } from './templates/s3';
import { SnowflakePlugin } from './templates/snowflake';
import { WorkflowPlugin } from './templates/workflow';

class PluginRegistry {
  plugins: Record<string, Plugin>;

  constructor(plugins: Record<string, Plugin>) {
    this.plugins = plugins;
  }

  get(pluginId: string): Plugin {
    return this.plugins[pluginId];
  }

  getIDs(): Set<string> {
    return new Set(Object.keys(this.plugins));
  }

  getAll(): Plugin[] {
    return Object.values(this.plugins);
  }

  getByIDs(ids: string[]): Plugin[] {
    return ids.map((id) => this.plugins[id]).filter((p) => !!p);
  }

  defaultPlugins(): Plugin[] {
    return [EmailPlugin, GraphQLPlugin, JavascriptPlugin, PythonPlugin, RestApiPlugin, WorkflowPlugin];
  }
}

//TODO(alex): get rid of googleSheetsClientId and googleSheetsRedirectPath, read this from a shared config
export const RegisteredPlugins = (googleSheetsClientId: string, googleSheetsRedirectPath: string): PluginRegistry =>
  new PluginRegistry({
    [BigQueryPlugin.id]: BigQueryPlugin,
    [DynamoDBPlugin.id]: DynamoDBPlugin,
    [EmailPlugin.id]: EmailPlugin,
    [GraphQLPlugin.id]: GraphQLPlugin,
    [JavascriptPlugin.id]: JavascriptPlugin,
    [MariaDBPlugin.id]: MariaDBPlugin,
    [MicrosoftSQLPlugin.id]: MicrosoftSQLPlugin,
    [MongoDBPlugin.id]: MongoDBPlugin,
    [MySQLPlugin.id]: MySQLPlugin,
    [PostgresPlugin.id]: PostgresPlugin,
    [PythonPlugin.id]: PythonPlugin,
    [RedshiftPlugin.id]: RedshiftPlugin,
    [RestApiIntegrationPlugin.id]: RestApiIntegrationPlugin,
    [RestApiPlugin.id]: RestApiPlugin,
    [RocksetPlugin.id]: RocksetPlugin,
    [S3Plugin.id]: S3Plugin,
    [SnowflakePlugin.id]: SnowflakePlugin,
    [WorkflowPlugin.id]: WorkflowPlugin,
    [GoogleSheetsPlugin(googleSheetsClientId, googleSheetsRedirectPath).id]: GoogleSheetsPlugin(
      googleSheetsClientId,
      googleSheetsRedirectPath
    )
  });
