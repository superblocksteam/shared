export interface DatabaseSchemaMetadata {
  tables: Table[];
}

export class Table {
  id?: string;
  type: TableType;
  name: string;
  columns: Column[];
  keys?: Key[];
  templates?: Template[];

  constructor(name: string, type: TableType) {
    this.name = name;
    this.type = type;
    this.columns = [];
    this.keys = [];
    this.templates = [];
  }
}

export enum TableType {
  TABLE = 'TABLE',
  VIEW = 'VIEW',
  ALIAS = 'ALIAS',
  COLLECTION = 'COLLECTION'
}

export class Column {
  name: string;
  type: string;

  constructor(name: string, type: string) {
    this.name = name.toLowerCase();
    this.type = type.toLowerCase();
  }
}

export interface PrimaryKey {
  name: string;
  type: 'primary key';
}

export interface ForeignKey {
  name: string;
  type: 'foreign key';
}

export type Key = PrimaryKey | ForeignKey;

export class Template {
  title: string;
  body: string;
}
