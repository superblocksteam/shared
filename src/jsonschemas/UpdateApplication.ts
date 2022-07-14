/* eslint-disable */
// This is a generated file, do not modify
import { UpdateApplication } from '../schemas/UpdateApplication';
import { getValidatorFunction } from '../utils';
import validate from './UpdateApplicationValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/UpdateApplication';

export const validateUpdateApplication = getValidatorFunction<UpdateApplication>(validate as ValidateFunction);
