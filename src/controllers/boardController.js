import createHttpError from 'http-errors';
import {
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
} from '../services/board.js';

export const getBoardByIdController = async (req, res) => {
  try {
    console.log('Request received for board ID:', req.params.id);
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
    const { title, background, icon, owner } = req.body; // Отримуємо дані з тіла запиту

    const newBoard = await createBoard({
      title,
      background: background || '',
      icon: icon || '',
      owner: owner /* || null */, // Додаємо owner (може бути null) для перевірки в постмен
    });

    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBoardController = async (req, res) => {
  try {
    const updatedBoard = await updateBoard(req.params.id, req.body);
    res.json(updatedBoard);
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      res.status(error.status).json({ message: error.message });
    } else {
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
