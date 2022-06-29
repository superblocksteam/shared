import { DatasourceConfiguration } from '../types';

export type DatasourceUpdate = {
  id?: string;
  name?: string;
  pluginId?: string;
  // @type uuid
  organizationId?: string;
  invalids?: string[];
} & (
  | {
      // When updating, only one of these is sent
      configurationProd: DatasourceConfiguration;
    }
  | {
      // When updating, only one of these is sent
      configurationStaging: DatasourceConfiguration;
    }
);
