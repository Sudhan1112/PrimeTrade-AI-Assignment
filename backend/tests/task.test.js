import { jest, describe, it, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

// Mock Service ONLY (Use real Auth middleware)
// Mock Service ONLY (Use real Auth middleware)
jest.unstable_mockModule('../services/task.service.js', () => ({
    default: {
        getAllTasks: jest.fn().mockResolvedValue({ tasks: [], count: 0 }),
        createTask: jest.fn().mockResolvedValue({ id: 'task-1', title: 'Test Task' }),
        getTaskById: jest.fn(),
        updateTask: jest.fn(),
        deleteTask: jest.fn(),
        getStats: jest.fn()
    }
}));

// Dynamic import for routes
const { default: taskRoutes } = await import('../routes/task.routes.js');

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/tasks', taskRoutes);

describe('Task API', () => {
    let token;

    beforeAll(() => {
        // Generate a real token
        const payload = { id: 'test-user-id', role: 'user' };
        token = jwt.sign(payload, process.env.JWT_SECRET || 'development-secret-key-123', { expiresIn: '1h' });
    });

    it('should get all tasks', async () => {
        const res = await request(app)
            .get('/api/v1/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.tasks).toEqual([]);
    });

    it('should create a task', async () => {
        const res = await request(app)
            .post('/api/v1/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'New Task',
                priority: 'high'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
    });

    it('should validate missing title', async () => {
        const res = await request(app)
            .post('/api/v1/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                priority: 'high'
            });

        expect(res.statusCode).toBe(400);
    });
});
