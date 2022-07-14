/* eslint-disable */
// This is a generated file, do not modify
import { DatasourceUpdate } from '../schemas/DatasourceUpdate';
import { getValidatorFunction } from '../utils';
import validate from './DatasourceUpdateValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/DatasourceUpdate';

export const validateDatasourceUpdate = getValidatorFunction<DatasourceUpdate>(validate as ValidateFunction);
