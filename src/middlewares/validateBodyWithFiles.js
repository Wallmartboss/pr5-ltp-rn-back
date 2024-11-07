import createHttpError from 'http-errors';

export const validateBodyWithFiles = (schema) => async (req, res, next) => {
  try {
    // Об'єднання req.body та req.files для валідації
    const combinedData = {
      ...req.body,
      ...(req.files && {
        background: req.files.background
          ? req.files.background[0].filename
          : undefined,
        icon: req.files.icon ? req.files.icon[0].filename : undefined,
      }),
    };

    // Перевірка на наявність хоча б одного ключа
    if (Object.keys(combinedData).length === 0) {
      throw createHttpError(400, '"value" must have at least 1 key');
    }

    // Валідація об'єднаних даних
    await schema.validateAsync(combinedData, {
      abortEarly: false,
    });

    next();
  } catch (err) {
    const errorDetails = err.details
      ? err.details.map((detail) => ({
          message: detail.message,
          path: detail.path,
          type: detail.type,
        }))
      : [{ message: err.message }];

    const responseError = createHttpError(400, 'Bad Request', {
      errors: errorDetails,
    });
    next(responseError);
  }
};
