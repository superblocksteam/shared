import { Param } from '../common/param';
import { AuthContext, DatasourceDto, DatasourceEnvironments } from '../datasource';
import { EventEntityType } from '../event';
import { Plugin } from '../plugin';
import { Action, ActionId } from './action';
import { ExecutionParam } from './execution';
import { Global } from './global';

// ApiNotificationConfiguration configures how the UI should be informed after
// an API runs.
export type ApiNotificationConfiguration = {
  onSuccess?: {
    enabled?: boolean;
    customText?: string;
  };
  onError?: {
    enabled?: boolean;
    includeError?: boolean;
    customText?: string;
    customDescription?: string;
  };
};

export interface Api {
  id: string;
  environment: DatasourceEnvironments;
  applicationId: string;
  actions: ApiDetails;
  triggerType: ApiTriggerType;
}

export type ApiDetails = {
  name: string;
  triggerActionId: ActionId;
  actions: {
    [key: string]: Action;
  };
  executeOnPageLoad?: boolean;
  notificationConfig?: ApiNotificationConfiguration;
  bindings?: string[];
  dynamicBindingPathList?: Param[];
  version?: string;
  deactivated?: Date;
  created?: Date;
  updated?: Date;
  supportedMethod?: 'GET' | 'POST';
  workflowParams?: ExecutionParam[];
};

// Full API definition including datasource and plugin
export type ApiDefinition = {
  api: Api;
  orgApiKey: string; // to authenticate dependent workflows
  organizationId?: string; // for audit logging
  datasources: Record<string, DatasourceDto>;
  plugins: Record<string, Plugin>;
  global: Global;
  locationContext?: ApiLocationContext;
  metadata?: ApiDefinitionMetadata;
  authContext?: AuthContext;
};

// ApiLocationContext locates an API
export type ApiLocationContext = {
  applicationId: string;
  pageId: string;
};

export type ApiDefinitionMetadata = {
  requester: string;
};

export enum ApiTriggerType {
  UI,
  WORKFLOW,
  SCHEDULE
}

export function apiTriggerToEntity(trigger: ApiTriggerType): EventEntityType {
  switch (trigger) {
    case ApiTriggerType.UI:
      return EventEntityType.API;
    case ApiTriggerType.WORKFLOW:
      return EventEntityType.WORKFLOW;
    case ApiTriggerType.SCHEDULE:
      return EventEntityType.SCHEDULED_JOB;
  }
}

export * from './action';
export * from './resolvedActionProp';
export * from './schedule';
export * from './execution';
export * from './global';
