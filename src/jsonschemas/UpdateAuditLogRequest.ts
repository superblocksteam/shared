/* eslint-disable */
// This is a generated file, do not modify
import { UpdateAuditLogRequest } from '../schemas/UpdateAuditLogRequest';
import { getValidatorFunction } from '../utils';
import validate from './UpdateAuditLogRequestValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/UpdateAuditLogRequest';

export const validateUpdateAuditLogRequest = getValidatorFunction<UpdateAuditLogRequest>(validate as ValidateFunction);
