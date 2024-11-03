import { Router } from 'express';
import {
  getAllTasksController,
  getTaskByIdController, 
  createTaskController,
  updateTaskController,
  deleteTaskController,
} from '../controllers/tasks.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { taskSchema } from '../validation/tasks.js';

const router = Router({ mergeParams: true });

router.get('/', getAllTasksController);
router.get('/:taskId', isValidId, getTaskByIdController); 
router.post('/', validateBody(taskSchema), createTaskController);
router.patch('/:taskId', isValidId, validateBody(taskSchema), updateTaskController);
router.delete('/:taskId', isValidId, deleteTaskController);

export default router;
