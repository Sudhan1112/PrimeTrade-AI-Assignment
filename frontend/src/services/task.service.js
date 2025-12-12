import api from './api';

const taskService = {
    getAll: async (params) => {
        // params: { page, limit, status, priority, sort }
        const response = await api.get('/tasks', { params });
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/tasks/stats');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/tasks', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/tasks/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        await api.delete(`/tasks/${id}`);
    }
};

export default taskService;
