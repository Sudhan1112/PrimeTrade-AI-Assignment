
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/tasks.json');

// Ensure data directory exists
const initialize = async () => {
    try {
        await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
        try {
            await fs.access(DATA_FILE);
        } catch {
            await fs.writeFile(DATA_FILE, JSON.stringify([]));
        }
    } catch (err) {
        console.error('Failed to initialize mock DB', err);
    }
};

initialize();

class TaskService {
    async _readTasks() {
        try {
            const data = await fs.readFile(DATA_FILE, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    async _writeTasks(tasks) {
        await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
    }

    async createTask(taskData) {
        const tasks = await this._readTasks();
        const newTask = {
            id: crypto.randomUUID(),
            ...taskData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        tasks.push(newTask);
        await this._writeTasks(tasks);
        return newTask;
    }

    async getAllTasks(filter) {
        const { page, limit, status, priority, sort, userId, role } = filter;
        let tasks = await this._readTasks();

        // Filter by User
        if (role !== 'admin') {
            tasks = tasks.filter(t => t.user_id === userId);
        }

        // Filter by Status/Priority
        if (status) tasks = tasks.filter(t => t.status === status);
        if (priority) tasks = tasks.filter(t => t.priority === priority);

        // Sort
        tasks.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return sort === 'created_at' ? dateB - dateA : dateB - dateA; // Default Desc
        });

        const total = tasks.length;

        // Pagination
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedTasks = tasks.slice(start, end);

        return { tasks: paginatedTasks, count: total };
    }

    async getTaskById(id) {
        const tasks = await this._readTasks();
        return tasks.find(t => t.id === id);
    }

    async updateTask(id, updates) {
        const tasks = await this._readTasks();
        const index = tasks.findIndex(t => t.id === id);
        if (index === -1) throw new Error('Task not found');

        const updatedTask = {
            ...tasks[index],
            ...updates,
            updated_at: new Date().toISOString()
        };

        tasks[index] = updatedTask;
        await this._writeTasks(tasks);
        return updatedTask;
    }

    async deleteTask(id) {
        let tasks = await this._readTasks();
        const initialLength = tasks.length;
        tasks = tasks.filter(t => t.id !== id);

        if (tasks.length === initialLength) throw new Error('Task not found');

        await this._writeTasks(tasks);
        return true;
    }

    async getStats(userId, role) {
        let tasks = await this._readTasks();
        if (role !== 'admin') {
            tasks = tasks.filter(t => t.user_id === userId);
        }

        return {
            total: tasks.length,
            pending: tasks.filter(t => t.status === 'pending').length,
            in_progress: tasks.filter(t => t.status === 'in_progress').length,
            completed: tasks.filter(t => t.status === 'completed').length,
        };
    }
}

export default new TaskService();
