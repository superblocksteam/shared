import { Plugin } from '../types';
import {
  BigQueryPlugin,
  DynamoDBPlugin,
  EmailPlugin,
  GoogleSheetsPlugin,
  GraphQLIntegrationPlugin,
  GraphQLPlugin,
  JavascriptPlugin,
  MariaDBPlugin,
  MicrosoftSQLPlugin,
  MongoDBPlugin,
  MySQLPlugin,
  PostgresPlugin,
  PythonPlugin,
  RedshiftPlugin,
  RestApiIntegrationPlugin,
  RestApiPlugin,
  RocksetPlugin,
  S3Plugin,
  SnowflakePlugin,
  WorkflowPlugin
} from './templates';

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
    [GraphQLIntegrationPlugin.id]: GraphQLIntegrationPlugin,
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
