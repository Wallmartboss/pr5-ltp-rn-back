
import createHttpError from 'http-errors';
import { ONE_DAY } from '../constants/index.js';
import { env } from "../utils/env.js";
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { loginUser, logoutUser, registerUser, updateTheme, updateUser } from '../services/user.js';
export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
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
export const getCurrentUserController = async (req, res) => {
  if (req.user) {
    res.json({
      status: 200,
      message: "Current user data retrieved successfully",
      data: req.user,
    });
  } else {
    res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};


export const updateThemeController = async (req, res, next) => {
  const { theme } = req.body;
  const userId = req.user._id;

  const updatedUser = await updateTheme(userId, theme);

  res.status(200).json({
    status: 200,
    message: 'Theme updated successfully!',
    data: updatedUser,
  });


};

export const updateUserController = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw createHttpError(401, 'User is not authenticated');
  }
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }


  };

  const updateData = {
    ...req.body,
  };

  if (photoUrl) {
    updateData.avatar = photoUrl;
  }

  const updatedUser = await updateUser(userId, updateData);
  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }
  res.json({
    status: 200,
    message: 'User updated successfully',
    data: updatedUser,
  });
};
