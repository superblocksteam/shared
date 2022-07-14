/* eslint-disable */
// This is a generated file, do not modify
import { LogRequestBody } from '../schemas/LogRequestBody';
import { getValidatorFunction } from '../utils';
import validate from './LogRequestBodyValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/LogRequestBody';

export const validateLogRequestBody = getValidatorFunction<LogRequestBody>(validate as ValidateFunction);
