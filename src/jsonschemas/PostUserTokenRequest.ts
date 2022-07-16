/* eslint-disable */
// This is a generated file, do not modify
import { PostUserTokenRequest } from '../schemas/PostUserTokenRequest';
import { getValidatorFunction } from '../utils';
import validate from './PostUserTokenRequestValidator';
import type { ValidateFunction } from 'ajv';

export * from '../schemas/PostUserTokenRequest';

export const validatePostUserTokenRequest = getValidatorFunction<PostUserTokenRequest>(validate as ValidateFunction);
