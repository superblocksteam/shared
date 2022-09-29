import { SemanticAttributes } from '@opentelemetry/semantic-conventions';

// SUPERBLOCKS ORGANZIATION
export const OBS_TAG_ORG_ID = 'organization-id';
export const OBS_TAG_ORG_NAME = 'organization-name';
export const OBS_TAG_USER_EMAIL = 'user-email';

// SUPERBLOCKS RESOURCE
export const OBS_TAG_RESOURCE_TYPE = 'resource-type';
export const OBS_TAG_RESOURCE_ID = 'resource-id';
export const OBS_TAG_RESOURCE_NAME = 'resource-name';
export const OBS_TAG_RESOURCE_ACTION = 'resource-action';
export const OBS_TAG_PARENT_ID = 'parent-id';
export const OBS_TAG_PARENT_NAME = 'parent-name';
export const OBS_TAG_PARENT_TYPE = 'parent-type';
export const OBS_TAG_PLUGIN_NAME = 'plugin-name';
export const OBS_TAG_PLUGIN_VERSION = 'plugin-version';
export const OBS_TAG_PLUGIN_EVENT = 'plugin-event';
export const OBS_TAG_INTEGRATION_ID = 'integration-id';

// SUPERBLOCKS INFRA
export const OBS_TAG_ENV = 'environment';
export const OBS_TAG_CORRELATION_ID = 'correlation-id';
export const OBS_TAG_CONTROLLER_ID = 'controller-id';
export const OBS_TAG_WORKER_ID = 'worker-id';

// SUPERBLOCKS EXECUTION
export const OBS_TAG_ERROR = 'error';
export const OBS_TAG_ERROR_TYPE = 'error-type';

// HTTP
export const OBS_TAG_HTTP_SCHEME = SemanticAttributes.HTTP_SCHEME;
export const OBS_TAG_HTTP_USER_AGENT = SemanticAttributes.HTTP_USER_AGENT;
export const OBS_TAG_HTTP_REQUEST_CONTENT_LENGTH = SemanticAttributes.HTTP_REQUEST_CONTENT_LENGTH;
export const OBS_TAG_HTTP_METHOD = SemanticAttributes.HTTP_METHOD;
export const OBS_TAG_HTTP_FLAVOR = SemanticAttributes.HTTP_FLAVOR;
export const OBS_TAG_HTTP_URL = SemanticAttributes.HTTP_URL;
export const OBS_TAG_HTTP_ROUTE = SemanticAttributes.HTTP_ROUTE;
export const OBS_TAG_HTTP_STATUS_CODE = SemanticAttributes.HTTP_STATUS_CODE;
export const OBS_TAG_NET_PEER_IP = SemanticAttributes.NET_PEER_IP;

// If you don't want to import a bunch of stuff...
export const OBS_TAGS = {
  ORG_ID: OBS_TAG_ORG_ID,
  ORG_NAME: OBS_TAG_ORG_NAME,
  USER_EMAIL: OBS_TAG_USER_EMAIL,
  RESOURCE_TYPE: OBS_TAG_RESOURCE_TYPE,
  RESOURCE_ID: OBS_TAG_RESOURCE_ID,
  RESOURCE_NAME: OBS_TAG_RESOURCE_NAME,
  RESOURCE_ACTION: OBS_TAG_RESOURCE_ACTION,
  PARENT_ID: OBS_TAG_PARENT_ID,
  PARENT_NAME: OBS_TAG_PARENT_NAME,
  PARENT_TYPE: OBS_TAG_PARENT_TYPE,
  PLUGIN_NAME: OBS_TAG_PLUGIN_NAME,
  PLUGIN_VERSION: OBS_TAG_PLUGIN_VERSION,
  PLUGIN_EVENT: OBS_TAG_PLUGIN_EVENT,
  INTEGRATION_ID: OBS_TAG_INTEGRATION_ID
};

// It is not valid to have a dash character in Prometheus label tames.
// However, we're already committed to the dash character in our observability
// product. Hence, we're just going to use this when adding metrics.
export const toMetricLabels = (tags: string[] | Record<string, string | number>): string[] | Record<string, string | number> => {
  const replace = /(\.|-)/g;

  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.replace(replace, '_'));
  }
  Object.keys(tags).forEach((tag) => {
    if (tag.match(replace)) {
      tags[tag.replace(replace, '_')] = tags[tag];
      delete tags[tag];
    }
  });
  return tags;
};
