import createHttpError from 'http-errors';
import {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
} from '../services/board.js';

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
    const { title, background, icon } = req.body; // Отримуємо дані з тіла запиту
    const owner = req.user.id;
    const newBoard = await createBoard({
      title,
      background: background || '',
      icon: icon || '',
      owner /* || null */, // Додаємо owner (може бути null) для перевірки в постмен
    });

    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBoardController = async (req, res) => {
  try {
    // з сервіс для оновлення викликаю функцію
    const updatedBoard = await updateBoard(req.params.id, req.body);
    res.json(updatedBoard);
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
