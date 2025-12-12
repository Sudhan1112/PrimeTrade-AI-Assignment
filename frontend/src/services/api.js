import axios from 'axios';
import { API_URL } from '../utils/constants';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor to handle errors (e.g. 401 logout)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // If unauthorized, clear token and maybe redirect
            // We avoid direct window.location here to separate concerns, 
            // but in simple apps, it's often done.
            // Better: Disptach an event or handle in component.

            // For now, we just reject, and the AuthProvider will handle checking validity.
        }
        return Promise.reject(error);
    }
);

export default api;
