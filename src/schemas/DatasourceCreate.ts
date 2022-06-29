import { DatasourceConfiguration } from '../types';

export type DatasourceCreate = {
  id: string;
  name: string;
  pluginId: string;
  // @type uuid
  organizationId: string;
  configurationProd: DatasourceConfiguration;
  // Staging is optional because it's not part of the initial form
  configurationStaging?: DatasourceConfiguration;
  invalids?: string[];
};
