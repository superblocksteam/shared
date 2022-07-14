/* eslint-disable */
// This is a generated file, do not modify
import { LayoutUpdate } from '../schemas/LayoutUpdate';
import { getValidatorFunction } from '../utils';
import validate from './LayoutUpdateValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/LayoutUpdate';

export const validateLayoutUpdate = getValidatorFunction<LayoutUpdate>(validate as ValidateFunction);
