import createHttpError from 'http-errors';
import Board from '../db/board.js';

export const authorizeUserBoards = async (req, res, next) => {
  // чи є користувач автентифікованим
  if (!req.user || !req.user.id) {
    return next(createHttpError(403, 'User not authenticated'));
  }

  const userId = req.user.id;
  const { id: boardId } = req.params;

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      throw createHttpError(404, 'Board not found');
    }

    // чи є право доступу до дошки
    if (board.owner.toString() !== userId) {
      throw createHttpError(403, 'Access denied: You do not own this board');
    }

    next();
  } catch (error) {
    next(error);
  }
};
