import Joi from 'joi';

export const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  color: Joi.string().valid('blue', 'pink', 'green', 'gray').required(),
  date: Joi.date().required(),
});
