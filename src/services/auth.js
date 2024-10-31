import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

import { TWO_HOURS } from '../constants/index.js';
import { UsersCollection } from "../db/user.js";
import { SessionsCollection } from '../db/session.js';

export const registerUser = async (payload) => {
    const user = await UsersCollection.findOne({ email: payload.email });
    if (user) throw createHttpError(409, 'Email in use');

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    return await UsersCollection.create({
        ...payload,
        password: encryptedPassword,
    });
};

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


    return await SessionsCollection.create({
        userId: user._id,
        accessToken,
        accessTokenValidUntil: new Date(Date.now() + TWO_HOURS),
    });
};

export const logoutUser = async (sessionId) => {
    await SessionsCollection.deleteOne({ _id: sessionId });
};