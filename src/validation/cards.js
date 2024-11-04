import Joi from 'joi';
import mongoose from 'mongoose';

export const cardSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  color: Joi.string().valid('blue', 'pink', 'green', 'gray').required(),
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
