import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller.js';
import validate from '../middleware/validator.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Validation Rules
const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role'),
    validate
];

const loginValidation = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validate
];

const updateProfileValidation = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    validate
];

// Routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.post('/logout', authController.logout);

// Protected Routes
router.get('/profile', requireAuth, authController.getCurrentUser);
router.put('/profile', requireAuth, updateProfileValidation, authController.updateCurrentUser);
router.post('/refresh', requireAuth, authController.refreshToken);

export default router;
