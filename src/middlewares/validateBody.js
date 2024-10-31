import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const responseError = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(responseError);
  }
};
