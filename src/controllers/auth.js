import { ONE_DAY } from '../constants/index.js';
import {
  loginUser,
  logoutUser,
  registerUser,
  //   refreshUsersSession,
} from '../services/auth.js';

export const registerUserController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
      userId: session.userId,
      name: session.name,
      email: session.email,
      avatar: session.avatar,
      theme: session.theme,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');

  res.status(204).send();
};
