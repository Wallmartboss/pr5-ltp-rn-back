import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import { TWO_HOURS } from '../constants/index.js';
import { UsersCollection } from '../db/user.js';
import { SessionsCollection } from '../db/session.js';

export const registerUser = async (payload) => {
  try {

    const user = await UsersCollection.findOne({ email: payload.email });
    if (user) {
      console.log('Email is already in use!');

      throw createHttpError(409, 'Email is already in use');
    }
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = await UsersCollection.create({
      ...payload,
      password: encryptedPassword,
    });


    const { password, ...userData } = newUser.toObject();

    return userData;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};
//   console.log(payload);
//   const user = await UsersCollection.findOne({ email: payload.email });
//   if (user) {
//     console.log('Email уже используется');
//     throw createHttpError(409, 'Email is already in use');
//   }

//   const encryptedPassword = await bcrypt.hash(payload.password, 10);

//   return await UsersCollection.create({
//     ...payload,
//     password: encryptedPassword,
//   });
// };

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');

  const session = await SessionsCollection.create({
    userId: user._id,
    accessToken,
    accessTokenValidUntil: new Date(Date.now() + TWO_HOURS),
  });

  return {
    accessToken: session.accessToken,
    userId: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    theme: user.theme,
  };
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
