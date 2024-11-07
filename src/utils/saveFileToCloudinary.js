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

/* export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url; */

// додала  try/catch якщо раптом помилка
export const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path); // Видалення файлу з локального сховища після завантаження
    return response.secure_url; // Повертає URL зображення на Cloudinary
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Error uploading file to Cloudinary');
  }
};
