import Joi from 'joi';
import { type AppConfig, appValidationSchema } from './app/index.js';
import {
  type GoogleOauthConfig,
  googleOauthValidationSchema,
} from './google-oauth/index.js';

export type BaseSchema = AppConfig & GoogleOauthConfig;

const schemas = [appValidationSchema, googleOauthValidationSchema];

export const validationSchema = schemas.reduce((accumulator, current) => {
  return accumulator.concat(current);
}, Joi.object());
