import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/user.js';

export const updateUser = async (userId, payload, options = {}) => {
  if (payload.password) {
    const saltRounds = 10;
    payload.password = await bcrypt.hash(payload.password, saltRounds);
  }
  const rawResult = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    {
      new: true,
      ...options,
    },
  );

  if (!rawResult) return null;

  return {
    name: rawResult.name,
    email: rawResult.email,
    avatar: rawResult.avatar,
    theme: rawResult.theme,
  };
};

export const updateTheme = async (userId, theme) => {
  if (!['light', 'dark', 'violet'].includes(theme)) {
    throw createHttpError(400, 'Invalid theme');
  }

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { theme },
    { new: true }
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return updatedUser;
};