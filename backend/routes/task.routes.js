import express from 'express';
import { body } from 'express-validator';
import * as taskController from '../controllers/task.controller.js';
import validate from '../middleware/validator.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const taskValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('status').optional().isIn(['pending', 'in_progress', 'completed']).withMessage('Invalid status'),
    body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
    validate
];

router.use(requireAuth); // All task routes require authentication

router.post('/', taskValidation, taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/stats', taskController.getStats); // Place before :id to avoiding matching 'stats' as id
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskValidation, taskController.updateTask);
router.patch('/:id', taskValidation, taskController.updateTask); // Reuse update logic
router.delete('/:id', taskController.deleteTask);

export default router;
