import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+=[\]{}|;:'",.<>?/-]*$/)
    .min(2)
    .max(32),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(
      /^[a-zA-Z0-9!#$%^&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%^&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]{2,}$/,
    ),
  theme: Joi.string().valid('light', 'dark', 'violet'),
  avatar: Joi.string(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+=[\]{}|;:'",.<>?/-]*$/)
    .min(8)
    .max(64),
});
