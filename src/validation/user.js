import Joi from 'joi';

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email().min(3).max(20),
    theme: Joi.string().valid('light', 'dark', 'violet'),
    avatar: Joi.string(),
});
