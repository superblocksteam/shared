import { ApplicationUserDto, DatasourceEnvironments } from '..';
import { Organization } from '../organization';
import { PageRef } from '../page';

export interface Application {
  id: string;
  environment: DatasourceEnvironments;
  name: string;
  // Older apps have this field, but it's unused
  icon?: string;
  color: string;
  organizationId: string;
  pages: PageRef[];
  new: boolean;
  appIsExample: boolean;
  isPublic: boolean;
  userPermissions: string[];
  deletedAt: Date;
}

export interface NewApplications {
  organizationApplications: OrganizationApplications[];
}

export interface OrganizationApplications {
  organization: Organization;
  applications: Application[];
}

export interface ApplicationPages {
  organizationId: string;
  pages: PageRef[];
}

export type GetEditorsForAppIdResponse = ApplicationUserDto[];
export type SetEditorsForAppIdResponse = { error?: string };
