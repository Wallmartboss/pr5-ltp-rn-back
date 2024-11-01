import { Router } from 'express';
import {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} from '../controllers/tasks.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { taskSchema } from '../validation/tasks.js';

const router = Router({ mergeParams: true });

// Маршрут для отримання всіх задач
router.get('/', getAllTasksController);

// Маршрут для створення нової задачі
router.post('/', validateBody(taskSchema), createTaskController);

// Маршрут для оновлення задачі
router.patch('/:taskId', isValidId, validateBody(taskSchema), updateTaskController);

// Маршрут для видалення задачі
router.delete('/:taskId', isValidId, deleteTaskController);

export default router;
