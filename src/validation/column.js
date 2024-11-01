import Joi from 'joi';

export const columnSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'missing required title field',
  }),
  // owner: Joi.string().messages({
  //   'any.required': 'missing required board field',
  // }),
});
