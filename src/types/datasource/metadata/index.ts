import { DatasourceConfiguration } from '..';
import { Plugin } from '../../plugin';
import { BucketMetadata } from './bucket';
import { DatabaseSchemaMetadata } from './database';

export interface DatasourceMetadataDto {
  dbSchema?: DatabaseSchemaMetadata;
  buckets?: BucketMetadata[];
}

export interface DatasourceMetadataRequest {
  datasourceConfig: DatasourceConfiguration;
  plugin: Plugin;
}

// TODO add DatasourceMetadataResponse wrapper instead of returning DatasourceMetadata directly

export * from './database';
export * from './bucket';
