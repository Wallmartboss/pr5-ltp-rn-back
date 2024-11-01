import Joi from 'joi';

export const needHelpSchema = Joi.object({
  email: Joi.string().email().required(),
  message: Joi.string().required(),
});
