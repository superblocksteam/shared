export interface UpdateApplication {
  environment?: 'staging' | 'production';
  name?: string;
  color?: string;
  icon?: string;
  // @format uuid
  folderId?: string;
  isPublic?: boolean;
}
