import { AuditLogDto } from '../audit';
import { DiagnosticMetadata, Metrics } from '../common';
import { AgentType } from '../organization';
import { SupportedPluginVersions } from '../plugin';
import { RemoteHttpLog } from './logging';

export type PostRegistrationRequestBody = {
  pluginVersions: SupportedPluginVersions;
  type: AgentType;
};

export type PostLogsRequestBody = {
  logs: RemoteHttpLog[];
};

export type PostDiagnosticRequestBody = DiagnosticMetadata;

export type PostHealthcheckRequestBody = Metrics;

export type PostAuditLogRequestBody = AuditLogDto;

export type PutAuditLogRequestBody = AuditLogDto;
