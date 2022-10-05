import { EventEntityType } from '../event';

export type RemoteHttpLog = BaseHttpLogFields & LogFields;

export type BaseHttpLogFields = {
  level: number;
  time: number;
  remote: boolean;
  msg: string;
};

export type LogFields = {
  // Required (global)
  resourceId: string;
  resourceType: EventEntityType;
  organizationId: string;
  // Optional (global)
  organizationName?: string;
  correlationId?: string;
  environment?: string;
  eventType?: string;
  resourceName?: string;
  resourceAction?: string;
  userEmail?: string;
  // Optional (error)
  error?: string;
  errorType?: string;
  // Optional (local)
  controllerId?: string;
  workerId?: string;
  parentId?: string;
  parentName?: string;
  parentType?: EventEntityType;
  plugin?: string;
  integragionId?: string;
};

export interface logger {
  trace(fields: LogFields, msg: string): void;

  debug(fields: LogFields, msg: string): void;

  info(fields: LogFields, msg: string): void;

  warn(fields: LogFields, msg: string): void;

  error(fields: LogFields, msg: string): void;
}
