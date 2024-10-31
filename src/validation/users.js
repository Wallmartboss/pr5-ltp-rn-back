import Joi from 'joi';

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email().min(3).max(20),
    theme: Joi.string().valid('light', 'dark', 'violet'),
    avatar: Joi.string(),
});
