/* eslint-disable */
// This is a generated file, do not modify
import { DiagnosticRequestBody } from '../schemas/DiagnosticRequestBody';
import { getValidatorFunction } from '../utils';
import validate from './DiagnosticRequestBodyValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/DiagnosticRequestBody';

export const validateDiagnosticRequestBody = getValidatorFunction<DiagnosticRequestBody>(validate as ValidateFunction);
