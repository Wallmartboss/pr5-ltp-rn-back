import Joi from 'joi';
import mongoose from 'mongoose';

export const cardSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().valid('low', 'medium', 'high', 'without').required(),
  date: Joi.date().optional(),
  boardId: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message('"boardId" must be a valid ObjectId');
    }
    return value;
  }).required(),
  columnId: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.message('"columnId" must be a valid ObjectId');
    }
    return value;
  }).required()
});
