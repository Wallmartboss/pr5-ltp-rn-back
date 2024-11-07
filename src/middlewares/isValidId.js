import { isValidObjectId } from 'mongoose';
import createError from 'http-errors';

export const isValidId = (param) => asyc (req, res, next) => {
  const id  = req.params[param];
  if (!isValidObjectId(Id)) {
    const error = createError(
      400,
      `Invalid contact ID: ${param}. It must be a valid MongoDB ObjectId.`,
    );
    return next(error);
  }

  next();
};
