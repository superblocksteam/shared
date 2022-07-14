/* eslint-disable */
// This is a generated file, do not modify
import { CreateApplication } from '../schemas/CreateApplication';
import { getValidatorFunction } from '../utils';
import validate from './CreateApplicationValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/CreateApplication';

export const validateCreateApplication = getValidatorFunction<CreateApplication>(validate as ValidateFunction);
