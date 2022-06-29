export enum EventEntityType {
  APPLICATION = 'application',
  WORKFLOW = 'workflow',
  SCHEDULED_JOB = 'scheduled_job',
  DATASOURCE = 'datasource',
  FOLDER = 'folder',
  USER = 'user',
  ORGANIZATION = 'organization',
  API = 'api',
  STEP = 'step',
  AGENT = 'agent',
  CONTROLLER = 'controller',
  WORKER = 'worker',
  SURVEY = 'survey',
  ACCOUNT = 'account',
  BILLING = 'billing',
  OBSERVABILITY = 'observability'
}

export enum ViewMode {
  EDITOR = 'editor',
  PREVIEW = 'preview',
  DEPLOYED = 'deployed'
}

export enum EventAction {
  CREATED = 'created',
  CLONED = 'cloned',
  DELETED = 'deleted',
  SHARED = 'shared',
  DEPLOYED = 'deployed',
  IMPORTED = 'imported',
  EXECUTED = 'executed',
  VIEWED = 'viewed',
  STARTED = 'started',
  FINISHED = 'finished',
  ADDED = 'added',
  PAUSED = 'paused',
  RESUMED = 'resumed',
  UPDATED = 'updated',
  REGISTERED = 'registered',
  DEREGISTERED = 'deregistered',
  SUBMITTED = 'submitted',
  VERIFIED = 'verified',
  ACCESS_REQUESTED = 'access_requested',
  ACCESS_ACCEPTED = 'access_accepted',
  EXTEND_TRIAL = 'extend_trial',
  UPGRADE_PLAN = 'upgrade_plan'
}

export interface UserEvent {
  userId?: string;
  email?: string;
  organizationId?: string;
  type: string;
  entityId?: string;
  entityType?: EventEntityType;
  entityName?: string;
  // properties is a field for event specific fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties?: Record<string, any>;
  createdAt: Date;
}

export interface EventEntity {
  id: string;
  name: string;
}
