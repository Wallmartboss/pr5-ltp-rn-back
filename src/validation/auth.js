import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+=[\]{}|;:'",.<>?/-]*$/)
    .min(2)
    .max(32)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(
      /^[a-zA-Z0-9!#$%^&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%^&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]{2,}$/,
    )
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+=[\]{}|;:'",.<>?/-]*$/)
    .min(8)
    .max(64)
    .required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+=[\]{}|;:'",.<>?/-]*$/)
    .min(8)
    .max(64)
    .required(),
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});
