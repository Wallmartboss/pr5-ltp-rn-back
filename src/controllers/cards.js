import createError from 'http-errors';
import { Card } from '../db/cards.js';
import { Column } from '../db/columnSchema.js';
import mongoose from 'mongoose';
import { updateCard } from '../services/cards.js';

export const getAllCardsController = async (req, res, next) => {
  try {
    const { boardId } = req.params; // отримуємо boardId та columnId з параметрів запиту

    // Шукаємо картки, що належать до зазначеної дошки та колонки
    const cards = await Card.find({ boardId });

    if (!cards || cards.length === 0) {
      throw createError(404, 'No cards found in this column');
    }

    res.json({
      status: 200,
      message: `Cards retrieved successfully for boardId ${boardId} `,
      data: cards,
    });
  } catch (error) {
    next(error);
  }
};

export const getCardByIdController = async (req, res, next) => {
  try {
    const { boardId } = req.body;
    const { cardId } = req.params;
    const card = await Card.findOne({ _id: cardId, boardId });

    if (!card) {
      throw createError(404, 'Card not found');
    }

    res.json({
      status: 200,
      message: 'Successfully found the card!',
      data: card,
    });
  } catch (error) {
    next(error);
  }
};

export const createCardController = async (req, res, next) => {
  try {
    const { title, description, priority, boardId, columnId, date } = req.body;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return res.status(400).json({ message: 'Invalid boardId' });
    }

    if (columnId && !mongoose.Types.ObjectId.isValid(columnId)) {
      return res.status(400).json({ message: 'Invalid columnId' });
    }

    // Додаємо поле date
    const cardData = {
      title,
      description,
      priority,
      boardId,
      columnId,
      date: date ? new Date(date) : null, // Перевірка і форматування дати
    };

    const newCard = await Card.create(cardData);
    console.log('Created card:', newCard);

    if (columnId) {
      const updatedColumn = await Column.findByIdAndUpdate(
        columnId,
        { $push: { cards: newCard._id } },
        { new: true },
      );

      if (!updatedColumn) {
        return res.status(404).json({ message: 'Column not found' });
      }

      console.log('Updated column with new card:', updatedColumn);
    }

    res.status(201).json({
      status: 201,
      message: 'Successfully created a card!',
      data: newCard,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCardController = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const task = await Card.findByIdAndDelete(cardId);
    if (!task) {
      throw createError(404, 'Card not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateCardController = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const { boardId, newColumnId, ...updateData } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(cardId) ||
      !mongoose.Types.ObjectId.isValid(boardId)
    ) {
      return res
        .status(400)
        .json({ message: 'Invalid cardId or boardId format' });
    }

    if (newColumnId) {
      updateData.columnId = newColumnId;
    }

    const updatedCard = await updateCard(cardId, boardId, updateData);

    if (!updatedCard) {
      throw createError(404, 'Card not found');
    }

    if (newColumnId) {
      await Column.findByIdAndUpdate(
        updatedCard.columnId,
        { $pull: { cards: updatedCard._id } },
        { new: true },
      );

      await Column.findByIdAndUpdate(
        newColumnId,
        { $push: { cards: updatedCard._id } },
        { new: true },
      );
    }

    res.json({
      status: 200,
      message: `Successfully updated Card with id ${cardId}!`,
      data: updatedCard,
    });
  } catch (error) {
    next(error);
  }
};

export const moveCardController = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const { columnId, newColumnId } = req.body;

    if (!cardId || !columnId || !newColumnId) {
      return next(createError(400, 'Card ID and Column ID are required.'));
    }

    if (
      !mongoose.Types.ObjectId.isValid(cardId) ||
      !mongoose.Types.ObjectId.isValid(columnId) ||
      !mongoose.Types.ObjectId.isValid(newColumnId)
    ) {
      return next(createError(400, 'Invalid IDs format.'));
    }

    const card = await Card.findById(cardId);
    if (!card) {
      return next(createError(404, 'Card not found.'));
    }

    // Удаляем карту из текущей колонки
    await Column.findByIdAndUpdate(
      columnId,
      { $pull: { cards: card._id } },
      { new: true },
    );

    // Обновляем columnId у карты
    card.columnId = newColumnId;
    await card.save();

    // Добавляем карту в новую колонку
    const targetColumn = await Column.findById(newColumnId);
    if (!targetColumn) {
      return next(createError(404, 'Target column not found.'));
    }

    if (!targetColumn.cards.includes(card._id)) {
      targetColumn.cards.push(card._id);
      await targetColumn.save();
    }

    res.status(200).json({
      message: 'Card moved successfully',
      card,
    });
  } catch (error) {
    console.error('Error while moving card:', error);
    next(error);
  }
};
