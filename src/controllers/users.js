
import createHttpError from 'http-errors';
import { env } from "../utils/env.js";
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { updateTheme, updateUser } from '../services/users.js';

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
