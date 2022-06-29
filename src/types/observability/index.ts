import { ObservabilityVendor, ObservabilityVendorType } from './vendor';

// https://opentelemetry.io/docs/concepts/data-sources/
export enum ObservabilityDatasource {
  LOGS = 'LOGS',
  METRICS = 'METRICS',
  TRACES = 'TRACES'
}

export type Observability = {
  id?: string;
  created?: Date;
  updated?: Date;
  type: ObservabilityVendorType;
  datasource: ObservabilityDatasource;
  config: ObservabilityVendor;
  organizationId: string;
};

export type GetSinksAllResponseDto = {
  observabilities: Observability[];
};

export type PostSinksResponseDto = {
  observability: Observability;
};

export type PostSinksRequestDto = {
  observability: Observability;
};

export type PutSinksResponseDto = {
  observability: Observability;
};

export type PutSinksRequestDto = {
  observability: Observability;
};

export type GetSinksResponseDto = {
  observability: Observability;
};

export type DeleteSinksResponseDto = {
  observability: Observability;
};

export * from './vendor';
