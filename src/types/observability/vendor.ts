export enum ObservabilityVendorType {
  AWS_OPEN_SEARCH = 'AWS_OPEN_SEARCH',
  DATADOG = 'DATADOG',
  ELASTIC_CLOUD = 'ELASTIC_CLOUD',
  KAFKA = 'KAFKA',
  CONFLUENT_CLOUD = 'CONFLUENT_CLOUD',
  // The sinks below are only used in sales demo
  SPLUNK = 'SPLUNK',
  DYNATRACE = 'DYNATRACE',
  GRAFANA = 'GRAFANA',
  APP_DYNAMICS = 'APP_DYNAMICS',
  NEW_RELIC = 'NEW_RELIC',
  CHRONO_SPHERE = 'CHRONO_SPHERE',
  PROMETHEUS = 'PROMETHEUS',
  SYSDIG = 'SYSDIG'
}

export type Kafka = {
  bootstrap: string;
  topic: string;
  username: string;
  password: string;
};

export type Datadog = {
  apiKey: string;
  site?: string; // The UI should always be sending this. To be extra safe and to be backward compatible, we'll default to the US.
};

export type Elastic = {
  cloudId: string;
  cloudAuth: string;
};

export type AwsOpenSearch = {
  host: string;
  port: string;
  userName: string;
  password: string;
};

export type DummyConfig = {
  koala: string;
};

export type ObservabilityVendor = {
  [ObservabilityVendorConfigurationKey.DATADOG]?: Datadog;
  [ObservabilityVendorConfigurationKey.ELASTIC]?: Elastic;
  [ObservabilityVendorConfigurationKey.KAFKA]?: Kafka;
  [ObservabilityVendorConfigurationKey.AWS_OPEN_SEARCH]?: AwsOpenSearch;
  // The sinks below are only used in sales demo
  [ObservabilityVendorConfigurationKey.SPLUNK]?: DummyConfig;
  [ObservabilityVendorConfigurationKey.DYNATRACE]?: DummyConfig;
  [ObservabilityVendorConfigurationKey.GRAFANA]?: DummyConfig;
  [ObservabilityVendorConfigurationKey.APP_DYNAMICS]?: DummyConfig;
  [ObservabilityVendorConfigurationKey.NEW_RELIC]?: DummyConfig;
  [ObservabilityVendorConfigurationKey.CHRONO_SPHERE]?: DummyConfig;
  [ObservabilityVendorConfigurationKey.PROMETHEUS]?: DummyConfig;
  [ObservabilityVendorConfigurationKey.SYSDIG]?: DummyConfig;
};

export enum ObservabilityVendorConfigurationKey {
  DATADOG = 'datadog',
  ELASTIC = 'elastic',
  KAFKA = 'kafka',
  AWS_OPEN_SEARCH = 'aws-open-search',
  // The sinks below are only used in sales demo
  SPLUNK = 'SPLUNK',
  DYNATRACE = 'DYNATRACE',
  GRAFANA = 'GRAFANA',
  APP_DYNAMICS = 'APP_DYNAMICS',
  NEW_RELIC = 'NEW_RELIC',
  CHRONO_SPHERE = 'CHRONO_SPHERE',
  PROMETHEUS = 'PROMETHEUS',
  SYSDIG = 'SYSDIG'
}
