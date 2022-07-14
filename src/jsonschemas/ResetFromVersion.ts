/* eslint-disable */
// This is a generated file, do not modify
import { ResetFromVersion } from '../schemas/ResetFromVersion';
import { getValidatorFunction } from '../utils';
import validate from './ResetFromVersionValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/ResetFromVersion';

export const validateResetFromVersion = getValidatorFunction<ResetFromVersion>(validate as ValidateFunction);
