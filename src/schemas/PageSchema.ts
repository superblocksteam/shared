import { Layout } from '../types';

export type PageSchema = {
  id: string;
  name: string;
  applicationId: string;
  deletedAt?: string;
  isHidden: boolean;
  layouts: Layout[];
  updated: string;
};
