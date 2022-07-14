/* eslint-disable */
// This is a generated file, do not modify
import { DatasourceConfigurationSchema } from '../schemas/DatasourceConfigurationSchema';
import { getValidatorFunction } from '../utils';
import validate from './DatasourceConfigurationSchemaValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/DatasourceConfigurationSchema';

export const validateDatasourceConfigurationSchema = getValidatorFunction<DatasourceConfigurationSchema>(validate as ValidateFunction);
