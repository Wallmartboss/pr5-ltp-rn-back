import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME, 'defaultCloudName'),
  api_key: env(CLOUDINARY.API_KEY, 'defaultApiKey'),
  api_secret: env(CLOUDINARY.API_SECRET, 'defaultApiSecret'),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
