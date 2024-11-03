import { Task } from '../db/tasks.js';

export const getAllTasks = async (boardId) => {
  return await Task.find({ boardId });
};

export const getTaskById = async (taskId, boardId) => {
  return await Task.findOne({ _id: taskId, boardId });
};

export const createTask = async (payload) => {
  return await Task.create(payload);
};

export const updateTask = async (taskId, boardId, payload) => {
  return await Task.findOneAndUpdate({ _id: taskId, boardId }, payload, { new: true });
};

export const deleteTask = async (taskId, boardId) => {
  return await Task.findOneAndDelete({ _id: taskId, boardId });
};



