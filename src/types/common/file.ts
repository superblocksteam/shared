type FileMetadata = {
  // original name
  name: string;
  extension: string;
  // mime type
  type: string;
  size: number;
  encoding: 'text' | 'base64' | 'binary';
};

export type FileMetadataPrivate = FileMetadata &
  Readonly<{
    $superblocksId: string;
  }>;

export type ReadableFile = FileMetadata &
  Readonly<{
    // only available in the browser, contains image urls like
    // "blob:http://app.superblockshq.com/uuid-uuid-uuid-uuid"
    previewUrl: string;
    readContents: () => string;
  }>;

type FileConstructorArgs = FileMetadata & {
  // We should consider supporting Blobs & Buffers for streaming file
  // contents
  contents: string;
};

export type FileConstructor = (fileDef: FileConstructorArgs) => ReadableFile;

export function isReadableFile(f: unknown): f is FileMetadataPrivate {
  if (!f || typeof f !== 'object' || Array.isArray(f)) {
    return false;
  }
  const entries = Object.entries(f as Record<string, unknown>);
  if (entries.length === 0) {
    return false;
  }
  return Object.entries(f as Record<string, unknown>).every(([key, value]) => {
    switch (key) {
      case 'name':
      case 'extension':
      case 'type':
      case 'encoding':
      case '$superblocksId':
        return typeof value === 'string';
      case 'size':
        return typeof value === 'number';
      case 'previewUrl':
        return typeof value === 'string' || typeof value === 'undefined';
      default:
        return false;
    }
  });
}

export function isReadableFileConstructor(f: unknown): f is FileConstructorArgs {
  if (!f || typeof f !== 'object') {
    return false;
  }
  return Object.entries(f as Record<string, unknown>).every(([key, value]) => {
    switch (key) {
      case 'name':
      case 'contents':
      case 'type':
        return typeof value === 'string';
      default:
        return false;
    }
  });
}
