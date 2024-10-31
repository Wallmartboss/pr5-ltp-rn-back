import Board from '../db/board.js';
import createHttpError from 'http-errors';

// Отримуємо всі дошки
export const getAllBoards = async (userId) => {
  console.log('Fetching boards for user ID:', userId);
  const boards = await Board.find({ owner: userId }); /* .populate('columns') */ //тут ще може таски треба додати
  return boards;
};

// Отримуєм дошку за ID
export const getBoardById = async (id) => {
  console.log(`Fetching board with ID: ${id}`);
  const board = await Board.findById(id); /* .populate('columns') */ //закомент.якщо не потрібні дані колонок у відповіді
  if (!board) {
    throw createHttpError(404, 'Board not found');
  }
  return board;
};

// Створюєм нову дошку
export const createBoard = async (data) => {
  const newBoard = new Board({
    title: data.title,
    background: data.background || '',
    icon: data.icon || '',
    owner: data.owner /* || null */, // Якщо owner не переданий, буде null- це теж для запиту в постмен
  });

  await newBoard.save();
  return newBoard;
};

// Оновляєм дошку за ID
export const updateBoard = async (id, data) => {
  // Знаходимо дошку за ID
  const board = await Board.findById(id);
  if (!board) {
    throw createHttpError(404, 'Board not found');
  }

  Object.assign(board, {
    title: data.title ?? board.title,
    background: data.background ?? board.background,
    icon: data.icon ?? board.icon,
  });

  // Зберігаємо оновлену дошку і повертаєм
  await board.save();
  return board;
};

// Видаляєм дошку за ID
export const deleteBoard = async (id) => {
  const board = await Board.findByIdAndDelete(id);
  if (!board) {
    throw createHttpError(404, 'Board not found');
  }
  return board;
};
