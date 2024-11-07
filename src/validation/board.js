import Joi from 'joi';

export const createBoardSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  background: Joi.string().uri().allow('').optional(),
  icon: Joi.string().allow('').optional(),
  owner: Joi.string().optional(), //тут можливо треба required()
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(3).max(50).optional(),
  background: Joi.string().optional(),
  icon: Joi.string().optional(),
}).min(1); // Мінімум одне поле для оновлення
