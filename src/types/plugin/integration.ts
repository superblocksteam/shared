export const GRAPHQL_BASE_PLUGIN_ID = 'graphql';
export const REST_API_BASE_PLUGIN_ID = 'restapi';

export enum ExtendedIntegrationPluginId {
  GRAPHQL = 'graphqlintegration',
  REST_API = 'restapiintegration'
}

// Note that we cannot import the plugins themselves to reference the id as
// that causes a cyclical import.
export const ExtendedIntegrationPluginMap: Record<string, string> = {
  [ExtendedIntegrationPluginId.GRAPHQL]: GRAPHQL_BASE_PLUGIN_ID,
  [ExtendedIntegrationPluginId.REST_API]: REST_API_BASE_PLUGIN_ID
};

export const EXTENDED_INTEGRATION_PLUGIN_IDS = Object.values(ExtendedIntegrationPluginId).map((val) => val as string);

export const pluginRequiresPersistedApiFetch = (pluginId = ''): boolean => {
  return !pluginId ? false : EXTENDED_INTEGRATION_PLUGIN_IDS.includes(pluginId);
};

// This function returns the appropriate plugin ID to use for the
// specified plugin ID. This is done specifically to handle integrations
// that are leveraging the same plugin package as a default plugin.
// For now, this is true for GraphQLIntegrationPlugin and GraphQLPlugin.
export const getBasePluginId = (pluginId = ''): string => {
  // DEFER TODO(taha) Eventually do this for the REST API integration as well
  // once we've proven this out with the GraphQL integration
  return pluginId === (ExtendedIntegrationPluginId.GRAPHQL as string) ? ExtendedIntegrationPluginMap[pluginId] : pluginId;
};
