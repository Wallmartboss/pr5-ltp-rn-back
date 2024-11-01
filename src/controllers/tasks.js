import createError from 'http-errors';
import { Task } from '../db/tasks.js';

export const getAllTasksController = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const tasks = await Task.find({ boardId });
    res.json({
      status: 200,
      message: 'Successfully found tasks!',
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const createTaskController = async (req, res, next) => {
  try {
    const { boardId } = req.params; 
    const { title, description, color, columnId } = req.body;

  
    if (!title || !description || !color || !columnId) {
      throw createError(400, 'All fields (title, description, color, columnId) are required.');
    }

    const taskData = { title, description, color, columnId, boardId }; // Додаємо boardId
    const task = await Task.create(taskData);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a task!',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteTaskController = async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId, boardId });
    if (!task) {
      throw createError(404, 'Task not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateTaskController = async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, boardId },
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      throw createError(404, 'Task not found');
    }
    res.json({
      status: 200,
      message: `Successfully updated task with id ${taskId}!`,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};
