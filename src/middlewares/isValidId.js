import { isValidObjectId } from 'mongoose';
import createError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { cardId } = req.params;
  if (!isValidObjectId(cardId)) {
    const error = createError(
      400,
      `Invalid contact ID: ${cardId}. It must be a valid MongoDB ObjectId.`,
    );
    return next(error);
  }

  next();
};
