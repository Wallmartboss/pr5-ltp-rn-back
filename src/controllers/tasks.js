import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
  } from '../services/tasks.js';
  import createError from 'http-errors';
  
  export const getAllTasksController = async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const tasks = await getAllTasks(boardId);
      res.json({
        status: 200,
        message: 'Successfully retrieved tasks',
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getTaskByIdController = async (req, res, next) => {
    try {
      const { boardId, taskId } = req.params;
      const task = await getTaskById(taskId, boardId);
      if (!task) throw createError(404, 'Task not found');
      res.json({
        status: 200,
        message: `Successfully retrieved task with id ${taskId}`,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const createTaskController = async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const task = await createTask({ ...req.body, boardId });
      res.status(201).json({
        status: 201,
        message: 'Successfully created task',
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const updateTaskController = async (req, res, next) => {
    try {
      const { boardId, taskId } = req.params;
      const task = await updateTask(taskId, boardId, req.body);
      if (!task) throw createError(404, 'Task not found');
      res.json({
        status: 200,
        message: `Successfully updated task with id ${taskId}`,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteTaskController = async (req, res, next) => {
    try {
      const { boardId, taskId } = req.params;
      const task = await deleteTask(taskId, boardId);
      if (!task) throw createError(404, 'Task not found');
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
  