/* eslint-disable */
// This is a generated file, do not modify
import { HealthcheckRequestBody } from '../schemas/HealthcheckRequestBody';
import { getValidatorFunction } from '../utils';
import validate from './HealthcheckRequestBodyValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/HealthcheckRequestBody';

export const validateHealthcheckRequestBody = getValidatorFunction<HealthcheckRequestBody>(validate as ValidateFunction);
