export const API_KEY_HEADER = 'x-superblocks-api-key';
export const AGENT_ENVIRONMENT_HEADER = 'x-superblocks-agent-environment';
export const AGENT_HOST_URL_HEADER = 'x-superblocks-agent-host-url';
export const AGENT_ID_HEADER = 'x-superblocks-agent-id';
export const AGENT_KEY_HEADER = 'x-superblocks-agent-key';
export const AGENT_VERSION_HEADER = 'x-superblocks-agent-version';
export const AGENT_VERSION_EXTERNAL_HEADER = 'x-superblocks-agent-version-external';
export const AGENT_INTERNAL_HOST_URL_HEADER = 'x-superblocks-agent-internal-host-url';
export const CORRELATION_ID = 'X-Superblocks-Correlation-Id';

export enum AGENT_EXTERNAL_VERSIONS {
  /* Versions greater than v0.31.0 support the workflow trigger with the bearer token as a query parameter. */
  V_0_31_0 = 'v0.31.0'
}

export const MIN_WORKFLOW_ALLOW_QUERY_PARAMS_AUTH_VERSION = AGENT_EXTERNAL_VERSIONS.V_0_31_0;

export const agentVersionRegExp = /v\d+\.\d+\.\d+/;

export * from './controller';
export * from './logging';
export * from './request';
