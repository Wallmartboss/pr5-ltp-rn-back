import Joi from 'joi';

export const cardSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  color: Joi.string().valid('blue', 'pink', 'green', 'gray').required(),
  date: Joi.date().optional(),
  boardId: Joi.string().required(),    
  columnId: Joi.string().required()    
});
