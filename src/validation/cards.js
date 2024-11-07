import Joi from 'joi';

export const cardSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().valid('low', 'medium', 'high', 'without').required(),
  date: Joi.date().optional(),
  newColumnId: Joi.string().optional(),
});
