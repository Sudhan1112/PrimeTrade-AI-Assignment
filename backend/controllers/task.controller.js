import taskService from '../services/task.service.js';
import { successResponse, createdResponse, errorResponse } from '../utils/response.js';

export const createTask = async (req, res, next) => {
    try {
        const { title, description, priority, status } = req.body;

        const taskData = {
            user_id: req.user.id, // Enforce owner
            user_name: req.user.name,
            user_email: req.user.email,
            title,
            description,
            priority: priority || 'medium',
            status: status || 'pending'
        };

        const task = await taskService.createTask(taskData);
        createdResponse(res, 'Task created successfully', { task });
    } catch (error) {
        next(error);
    }
};

export const getAllTasks = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { status, priority, sort } = req.query;

        const filter = {
            page, limit, status, priority, sort,
            userId: req.user.id, // For RBAC
            role: req.user.role   // For RBAC
        };

        const { tasks, count } = await taskService.getAllTasks(filter);

        successResponse(res, 'Tasks retrieved successfully', {
            tasks,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit)
            }
        });

    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTaskById(id);

        if (!task) {
            return errorResponse(res, 404, 'Task not found');
        }

        // RBAC Check
        if (req.user.role !== 'admin' && task.user_id !== req.user.id) {
            return errorResponse(res, 403, 'Forbidden: You do not have access to this task');
        }

        successResponse(res, 'Task retrieved successfully', { task });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // TODO: Ideally fetch first to verify ownership, or try update with conditions.
        // Fetching first is safer for granular error messages.
        const existingTask = await taskService.getTaskById(id);
        if (!existingTask) return errorResponse(res, 404, 'Task not found');

        if (req.user.role !== 'admin' && existingTask.user_id !== req.user.id) {
            return errorResponse(res, 403, 'Forbidden: You cannot update this task');
        }

        // Sanitize updates
        // Prevent changing id
        delete updates.id;
        delete updates.created_at;

        // Only Admin can reassign
        if (req.user.role !== 'admin') {
            delete updates.user_id;
            delete updates.user_name;
            delete updates.user_email;
        } else if (updates.user_id) {
            // If admin is reassigning, ensure name/email are provided or handled?
            // Ideally frontend sends user_id, user_name, user_email together.
        }

        const updatedTask = await taskService.updateTask(id, updates);
        successResponse(res, 'Task updated successfully', { task: updatedTask });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check ownership
        const existingTask = await taskService.getTaskById(id);
        if (!existingTask) return errorResponse(res, 404, 'Task not found');

        if (req.user.role !== 'admin' && existingTask.user_id !== req.user.id) {
            return errorResponse(res, 403, 'Forbidden: You cannot delete this task');
        }

        await taskService.deleteTask(id);
        successResponse(res, 'Task deleted successfully', null);
    } catch (error) {
        next(error);
    }
};

export const getStats = async (req, res, next) => {
    try {
        const stats = await taskService.getStats(req.user.id, req.user.role);
        successResponse(res, 'Stats retrieved', { stats });
    } catch (error) {
        next(error);
    }
}
