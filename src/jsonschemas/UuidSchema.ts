/* eslint-disable */
// This is a generated file, do not modify
import { UuidSchema } from '../schemas/UuidSchema';
import { getValidatorFunction } from '../utils';
import validate from './UuidSchemaValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/UuidSchema';

export const validateUuidSchema = getValidatorFunction<UuidSchema>(validate as ValidateFunction);
