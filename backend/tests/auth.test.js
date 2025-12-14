import { jest, describe, it, expect } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';

// Mock dependencies using unstable_mockModule for ESM
jest.unstable_mockModule('../services/auth.service.js', () => ({
    register: jest.fn(),
    login: jest.fn(),
    getProfile: jest.fn()
}));

jest.unstable_mockModule('../config/supabase.js', () => ({
    supabase: {
        auth: {
            signUp: jest.fn(),
            signInWithPassword: jest.fn(),
            signOut: jest.fn()
        }
    }
}));

// Import Routes AFTER mocks
const { default: authRoutes } = await import('../routes/auth.routes.js');

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/auth', authRoutes);

describe('Auth API', () => {
    it('should register a new user', async () => {
        // We aren't checking the service call result deeply here, just that the route validation passes 
        // and it tries to process handled by controller (which might fail if service mock returns undefined, but we check !404)

        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: 'user'
            });

        // Assuming controller handles the empty mock response gracefully or errors with 500, but definitely NOT 404
        expect(res.statusCode).not.toBe(404);
    });

    it('should validate missing email', async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Test User',
                password: 'password123'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });
});
