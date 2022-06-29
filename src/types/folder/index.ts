export class FolderDataDto {
  name: string;
}

export class FolderDto extends FolderDataDto {
  id: string;
  organizationId: string;
  creator?: {
    id: string;
    name: string;
  };
}

export const DEMO_ENTITIES_FOLDER_NAME = 'Demo Apps, Workflows, and Jobs';
