import { Column } from '../db/columnSchema.js';
import { getAllColumns, createColumn } from '../services/column.js';
import Board from '../db/board.js'; //Леся

// import createError from 'http-errors';

export const getAllColumnsController = async (req, res) => {
  try {
    const { boardId } = req.params;
    const Columns = await getAllColumns(boardId);
    res.json(Columns);
  } catch (error) {
    console.error('Error in getAllColumnsController:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const postColumn = async (req, res) => {
  try {
    const { title } = req.body; // Отримуємо дані з тіла запиту
    const { boardId } = req.params;
    const newColumn = await createColumn({
      title,
      boardId: boardId, //Леся
    });

    // Додаємо колонку до дошки Леся
    await Board.findByIdAndUpdate(boardId, {
      $push: { columns: newColumn._id },
    });

    res.status(201).json(newColumn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateById = async (req, res) => {
  try {
    const { columnId } = req.params;
    const { title } = req.body;

    const column = await Column.findOneAndUpdate(
      { _id: columnId },
      { title },
      { new: true },
    );

    if (!column) {
      return res
        .status(404)
        .json({ error: 'Column not found or not linked to this board' });
    }

    res.json(column);
  } catch (error) {
    console.error('Error in updateById:', error);
    res.status(500).json({ message: 'Failed to update column' });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { columnId } = req.params;

    const column = await Column.findOneAndDelete({ _id: columnId });
    if (!column) {
      return res
        .status(404)
        .json({ error: 'Column not found or not linked to this board' });
    }
    res.json({ message: 'Column deleted successfully', deletedColumn: column });
  } catch (error) {
    console.error('Error in deleteById:', error);
    res.status(500).json({ message: 'Failed to delete column' });
  }
};
