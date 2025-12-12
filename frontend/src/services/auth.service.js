import api from './api';

const authService = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
        }
        return response.data;
    },

    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
        }
        return response.data;
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            console.error("Logout failed remotely", e);
        } finally {
            localStorage.removeItem('token');
        }
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    },
};

export default authService;
