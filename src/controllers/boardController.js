import createHttpError from 'http-errors';
import {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
} from '../services/board.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';

export const getAllBoardsController = async (req, res) => {
  try {
    const userId = req.user.id; // ID юзера з middleware authenticate
    console.log('User ID:', userId);

    const boards = await getAllBoards(userId);
    res.json(boards);
  } catch (error) {
    console.error('Error in getAllBoardsController:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getBoardByIdController = async (req, res) => {
  try {
    const board = await getBoardById(req.params.id);
    res.json(board);
  } catch (error) {
    console.error('Error in getBoardByIdController:', error);

    if (error instanceof createHttpError.HttpError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export const createBoardController = async (req, res) => {
  try {
    const { title } = req.body;
    const owner = req.user.id;
    let backgroundUrl, iconUrl;

    if (req.files && req.files.background) {
      backgroundUrl =
        env('ENABLE_CLOUDINARY') === 'true'
          ? await saveFileToCloudinary(req.files.background[0])
          : await saveFileToUploadDir(req.files.background[0]);
    }

    if (req.files && req.files.icon) {
      iconUrl =
        env('ENABLE_CLOUDINARY') === 'true'
          ? await saveFileToCloudinary(req.files.icon[0])
          : await saveFileToUploadDir(req.files.icon[0]);
    }

    const newBoard = await createBoard({
      title,
      background: backgroundUrl || '',
      icon: iconUrl || '',
      owner,
    });

    res.status(201).json(newBoard);
  } catch (error) {
    console.error('Error in createBoardController:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateBoardController = async (req, res) => {
  try {
    const { title, background, icon } = req.body;
    const boardId = req.params.id;

    let updatedBackgroundUrl = background || ''; // Якщо фон не наданий, використовуємо значення по замовчуванню
    let updatedIconUrl = icon || ''; // Якщо іконка не надана, використовуємо значення по замовчуванню

    if (req.files) {
      if (req.files.background) {
        // Якщо файл — це фон, обробляємо його
        if (env('ENABLE_CLOUDINARY') === 'true') {
          updatedBackgroundUrl = await saveFileToCloudinary(
            req.files.background[0],
          );
        } else {
          updatedBackgroundUrl = await saveFileToUploadDir(
            req.files.background[0],
          );
        }
      }

      if (req.files.icon) {
        // Якщо файл — це іконка, обробляємо її
        if (env('ENABLE_CLOUDINARY') === 'true') {
          updatedIconUrl = await saveFileToCloudinary(req.files.icon[0]);
        } else {
          updatedIconUrl = await saveFileToUploadDir(req.files.icon[0]);
        }
      }
    }

    // оновлення
    const updateData = {};

    if (title) updateData.title = title;
    if (updatedBackgroundUrl) updateData.background = updatedBackgroundUrl;
    if (updatedIconUrl) updateData.icon = updatedIconUrl;

    // Перевірка, чи надано хоча б одне поле для оновлення
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message:
          'No fields to update. Please provide at least one field to update.',
      });
    }
    // сервіс для оновлення дошки
    const updatedBoard = await updateBoard(boardId, updateData);

    if (!updatedBoard) {
      throw createHttpError(404, 'Board not found');
    }

    // Відповідь з оновленими даними
    res.json({
      status: 200,
      message: 'Board updated successfully',
      data: updatedBoard,
    });
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      res.status(error.status).json({ message: error.message });
    } else {
      console.error('Error in updateBoardController:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export const deleteBoardController = async (req, res) => {
  try {
    await deleteBoard(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
