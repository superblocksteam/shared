/* eslint-disable */
// This is a generated file, do not modify
import { RegistrationRequestBody } from '../schemas/RegistrationRequestBody';
import { getValidatorFunction } from '../utils';
import validate from './RegistrationRequestBodyValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/RegistrationRequestBody';

export const validateRegistrationRequestBody = getValidatorFunction<RegistrationRequestBody>(validate as ValidateFunction);
