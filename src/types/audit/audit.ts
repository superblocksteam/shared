export enum AuditLogEntityType {
  APPLICATION,
  WORKFLOW,
  SCHEDULED_JOB,
  DATASOURCE,
  FOLDER
}

export enum ApiRunEventType {
  FINISH
}

export enum AuditLogEventType {
  API_RUN
}

export interface AuditLogDetails {
  type: AuditLogEventType;
  endTime?: Date;
}

export type AuditLogDto = {
  id?: string;
  entityId: string;
  entityType: AuditLogEntityType;
  organizationId?: string;
  deployed: boolean;
  startTime: Date;
  endTime?: Date;
  source?: string;
  type?: AuditLogEventType;
  details?: AuditLogDetails;
  steps?: StepDetail[];
  agentId?: string;
};

export interface StepDetail {
  name: string;
  id: string;
  pluginId: string;
  datasourceId: string;
  error?: string;
  startTimeUtc?: Date;
  executionTimeMs?: number;
}

// TODO(pbardea): This is a temporary limit until filtering can be pushed to the
// backend for proper pagination.
export const AUDIT_LOG_PAGINATION_LIMIT = 5000;
