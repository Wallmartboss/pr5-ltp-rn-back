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
import { authenticate } from '../middlewares/authenticate.js';
import { taskSchema } from '../validation/tasks.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router({ mergeParams: true });
router.use(authenticate);

router.get('/', getAllTasksController);
router.get('/:taskId', isValidId, ctrlWrapper(getTaskByIdController));

router.post('/', validateBody(taskSchema), createTaskController);
router.put('/:taskId', isValidId, validateBody(taskSchema), updateTaskController);
router.delete('/:taskId', isValidId, deleteTaskController);

export default router;
