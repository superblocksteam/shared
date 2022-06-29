import { ApplicationUserStatus } from '../user';

export enum OrganizationRbacAction {
  MANAGE = 'manage'
}

export enum RbacAction {
  READ = 'read',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  DEPLOY = 'deploy',
  SHARE = 'share',
  BUILD = 'build',
  EXECUTE = 'execute',
  RESET = 'reset'
}

export enum GroupRbacAction {
  READ = 'read',
  DELETE = 'delete',
  UPDATE = 'update'
}

export enum RbacRole {
  VIEWER = 'viewer',
  BUILDER = 'builder',
  CONFIGURATOR = 'configurator',
  OWNER = 'owner',
  NONE = 'none',
  EXECUTOR = 'executor' // for app api
}

// used when querying permissions (roles table)
export enum PermissionedEntities {
  APPLICATION = 'application',
  API = 'api',
  INTEGRATION = 'integration'
}

// used in representation layer
export enum PermissionEntityType {
  APPLICATION = 'application',
  WORKFLOW = 'workflow',
  SCHEDULED_JOB = 'scheduled_job',
  INTEGRATION = 'integration'
}

type BaseShareEntryDto = {
  id: string;
  role: RbacRole;
  name: string;
  actorId: string;
};

export type UserShareEntryDto = BaseShareEntryDto & {
  type: 'user';
  email: string;
  status: ApplicationUserStatus;
};

export type GroupShareEntryDto = BaseShareEntryDto & {
  type: 'group';
  size?: number;
};

export type ShareEntryDto = UserShareEntryDto | GroupShareEntryDto;

export const isUserShareEntry = (shareEntry: ShareEntryDto): shareEntry is UserShareEntryDto => shareEntry.type === 'user';
export const isGroupShareEntry = (shareEntry: ShareEntryDto): shareEntry is GroupShareEntryDto => shareEntry.type === 'group';

// When creating a new share entry, we might not have the user ID yet.
export type ShareEntryCreationDto = {
  // lookupId is either an email address or a group ID.
  lookupId: string;
  type: 'user' | 'group';
  role: RbacRole;
};

type BasePermissionEntity = {
  id: string;
  type: PermissionEntityType;
  name: string;
};

export type ApplicationEntity = BasePermissionEntity & {
  defaultPageId: string;
};

export type WorkflowEntity = BasePermissionEntity;
export type JobEntity = BasePermissionEntity;
export type IntegrationEntity = BasePermissionEntity;

export type PermissionEntity = ApplicationEntity | WorkflowEntity | JobEntity | IntegrationEntity;

export const isApplicationEntity = (entity: PermissionEntity): entity is ApplicationEntity =>
  entity.type === PermissionEntityType.APPLICATION;

// Entity is referring to application, workflow, or job.
export type EntityPermissionsDto = {
  entity: PermissionEntity;
  permissions: ShareEntryDto[];
};

export type AccessRequestDto = {
  id: string;
  requesterId: string;
  requesteeId: string;
  role: RbacRole;
};

export type AcceptRequestDto = {
  permissions: ShareEntryDto[];
  role: RbacRole;
  requester: {
    id: string;
    name: string;
    email: string;
  };
};
