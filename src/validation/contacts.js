import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9\+\-\(\)\s]+$/)
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.pattern.base':
        'PhoneNumber can consist of only numbers, signs +, (, ), or -',
      'string.min': 'PhoneNumber name should have at least {#limit} characters',
      'string.max': 'PhoneNumber should have at most {#limit} characters',
      'any.required': 'phoneNumber is required',
    }),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9\+\-\(\)\s]+$/)
    .min(3)
    .max(20)
    .messages({
      'string.base':
        'PhoneNumber can consist of only numbers, signs +, (, ) or -', // Кастомізація повідомлення для типу "string"
      'string.min': 'PhoneNumber name should have at least {#limit} characters',
      'string.max': 'PhoneNumber should have at most {#limit} characters',
    }),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
