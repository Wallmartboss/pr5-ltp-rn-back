import { Column } from '../db/columnSchema.js';

import createError from 'http-errors';

export const postColumn = async (req, res) => {
  const { boardId } = req.params;

  try {
    const newColumn = await Column.create({ ...req.body, owner: boardId });
    res.status(201).json(newColumn);
  } catch (error) {
    throw createError(404, 'Failed to create a column');
  }
};

export const updateById = async (req, res) => {
  try {
    const { columnId } = req.params;

    const result = await Column.findByIdAndUpdate(columnId, req.body, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ error: 'Column not found' });
    }
    res.json(result);
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || 'Failed to update column';
    res.status(status).json({ error: message });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { columnId } = req.params;
    const result = await Column.findByIdAndRemove(columnId);
    if (!result) {
      return res.status(404).json({ error: 'Column not found' });
    }
    res.json({ message: 'Column deleted successfully', deletedColumn: result });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || 'Failed to remove column';
    res.status(status).json({ error: message });
  }
};
