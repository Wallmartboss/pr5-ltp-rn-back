import { isValidObjectId } from 'mongoose';
import createError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = createError(
      400,
      `Invalid contact ID: ${contactId}. It must be a valid MongoDB ObjectId.`,
    );
    return next(error);
  }

  next();
};
