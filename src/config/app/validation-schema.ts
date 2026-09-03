import Joi from 'joi';
import { AppConfig } from './types.js';

const validationSchema = Joi.object<AppConfig>({
  NODE_ENV: Joi.string()
    .required()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
});

export default validationSchema;
