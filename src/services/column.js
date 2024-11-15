import { Column } from '../db/columnSchema.js';
import createHttpError from 'http-errors';

// Отримуємо всі колонки
export const getAllColumns = async (boardId) => {
  console.log('Fetching columns for board ID:', boardId);
  const columns = await Column.find({
    board: boardId,
  }).populate('cards');
  console.log(columns);
  return columns;
};

// Отримуєм колонку за ID

// Створюєм нову колонку
export const createColumn = async (data) => {
  const newColumn = new Column({
    title: data.title,
    board: data.boardId,
  });

  await newColumn.save();
  return newColumn;
};

// Оновляєм колонку за ID
export const updateColumn = async (id, data) => {
  // Знаходимо колонку за ID
  const column = await Column.findById(id);
  if (!column) {
    throw createHttpError(404, 'column not found');
  }

  Object.assign(column, {
    title: data.title ?? column.title,
    board: data.board ?? column.board,
  });

  // Зберігаємо оновлену колонку і повертаєм
  await column.save();
  return column;
};

// Видаляєм колонку за ID
export const deleteColumn = async (id) => {
  const column = await Column.findByIdAndDelete(id);
  if (!column) {
    throw createHttpError(404, 'column not found');
  }
  return column;
};
