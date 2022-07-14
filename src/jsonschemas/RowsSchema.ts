/* eslint-disable */
// This is a generated file, do not modify
import { RowsSchema } from '../schemas/RowsSchema';
import { getValidatorFunction } from '../utils';
import validate from './RowsSchemaValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/RowsSchema';

export const validateRowsSchema = getValidatorFunction<RowsSchema>(validate as ValidateFunction);
