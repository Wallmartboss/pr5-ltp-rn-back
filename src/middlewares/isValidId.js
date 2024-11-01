import { isValidObjectId } from 'mongoose';
import createError from 'http-errors';

export const isValidId = (param) =>(req, res, next) => {
  const  itemId  = req.params[param];
  if (!isValidObjectId(itemId)) {
    const error = createError(
      400,
      `Invalid  ID: ${itemId}. It must be a valid MongoDB ObjectId.`,
    );
    return next(error);
  }

  next();
};
