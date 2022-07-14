/* eslint-disable */
// This is a generated file, do not modify
import { DatasourceConfigurationByTypeSchema } from '../schemas/DatasourceConfigurationByTypeSchema';
import { getValidatorFunction } from '../utils';
import validate from './DatasourceConfigurationByTypeSchemaValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/DatasourceConfigurationByTypeSchema';

export const validateDatasourceConfigurationByTypeSchema = getValidatorFunction<DatasourceConfigurationByTypeSchema>(validate as ValidateFunction);
