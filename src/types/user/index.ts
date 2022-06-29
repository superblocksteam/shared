import { DataTreeGroup } from '../group';

export interface User {
  id: string;
  email: string;
  currentOrganizationId: string;
  organizationIds: string[];
  isAnonymous: boolean;
}

export enum ApplicationUserStatus {
  EDITOR_PENDING_JOIN = 0,
  EDITOR_JOINED = 1
}

export interface ApplicationUserDto {
  name: string;
  email: string;
  id: string;
  status: ApplicationUserStatus;
}

export enum OrganizationUserStatus {
  PENDING_JOIN = 0,
  JOINED = 1
}

export interface OrganizationUserDto {
  name: string;
  email: string;
  id: string;
  status: OrganizationUserStatus;
}

export interface Invitee {
  email: string;
}

export type DataTreeUser = {
  username: string;
  email: string;
  id: string;
  groups: DataTreeGroup[];
};

export enum AccessMode {
  VISITOR = 'visitor',
  AUTH_USER = 'auth_user'
}

export interface VisitorInfo {
  visitorId: string;
  referrer?: string;
}

export * from './permission';
export * from './survey';
export * from './emailVerification';
export * from './analytics';
