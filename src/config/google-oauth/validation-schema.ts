import Joi from 'joi';
import { GoogleOauthConfig } from './types.js';
const validationSchema = Joi.object<GoogleOauthConfig>({
  GOOGLE_SCOPES_API: Joi.string().required(),
  DESKTOP_CLIENT_ID: Joi.string().required(),
  DESKTOP_PROJECT_ID: Joi.string().required(),
  DESKTOP_AUTH_URI: Joi.string().required(),
  DESKTOP_TOKEN_URI: Joi.string().required(),
  DESKTOP_AUTH_URI_X509_CERT_URL: Joi.string().required(),
  DESKTOP_CLIENT_SECRET: Joi.string().required(),
  DESKTOP_REDIRECTED_URIS: Joi.string().required(),
  WEB_CLIENT_ID: Joi.string().required(),
  WEB_PROJECT_ID: Joi.string().required(),
  WEB_AUTH_URI: Joi.string().required(),
  WEB_TOKEN_URI: Joi.string().required(),
  WEB_AUTH_URI_X509_CERT_URL: Joi.string().required(),
  WEB_CLIENT_SECRET: Joi.string().required(),
  WEB_REDIRECTED_URIS: Joi.string().required(),
  WEB_ORIGINS: Joi.string().required(),
});

export default validationSchema;
