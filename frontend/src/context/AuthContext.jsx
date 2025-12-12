import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await authService.getCurrentUser();
                    setUser(res.data.user);
                } catch (error) {
                    console.error('Auth initialization failed', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await authService.login(email, password);
            setUser(res.data.user);
            toast.success('Login successful!');
            return true;
        } catch (error) {
            const message = error.response?.data?.error?.message || 'Login failed';
            toast.error(message);
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const res = await authService.register(userData);
            setUser(res.data.user);
            toast.success('Registration successful!');
            return true;
        } catch (error) {
            const message = error.response?.data?.error?.message || 'Registration failed';
            toast.error(message);
            return false;
        }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        toast.success('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
