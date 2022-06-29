import { Layout } from './layout';

export interface Page {
  id: string;
  name: string;
  applicationId: string;
  // TODO rename field to deactivated in the FE
  deletedAt?: Date;
  isHidden: boolean;
  layouts: Layout[];
}

export interface PageRef {
  id: string;
  name: string;
  isDefault: boolean; // When there are multiple pages per app
  isHidden: boolean;
}

export interface PageDetails {
  id: string;
  name: string;
  applicationId: string;
  layouts?: Layout[];
  isHidden: boolean;
  version?: string;
  deactivated: Date;
  created: Date;
  updated: Date;
}

export * from './layout';
