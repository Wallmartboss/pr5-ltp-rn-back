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


router.get('/', getAllTasksController);
router.post('/', validateBody(taskSchema), createTaskController);
router.put('/:taskId', isValidId, validateBody(taskSchema), updateTaskController);
router.delete('/:taskId', isValidId, deleteTaskController);

export default router;
