import Joi from 'joi';

export const cardSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().valid('low', 'medium', 'high', 'without').required(),
  date: Joi.date().optional(),
  boardId: Joi.string().required(),
  columnId: Joi.string().optional(),
  newColumnId: Joi.string().optional(),
});

export const updateCardSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  priority: Joi.string().valid('low', 'medium', 'high', 'without').optional(),
  date: Joi.date().optional(),
  boardId: Joi.string().required(), 
  columnId: Joi.string().required(),
  newColumnId: Joi.string().optional() 
});
