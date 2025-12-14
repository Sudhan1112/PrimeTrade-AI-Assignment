import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/auth.service';

const TaskForm = ({ task, onClose, onSubmit }) => {
    const { user } = useAuth(); // Use context for reliable user info
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        user_id: '',
        user_name: '',
        user_email: ''
    });

    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    // Robust admin check using the context user object
    const isAdmin = user?.role === 'admin';

    // Initialize Form Data
    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description || '',
                status: task.status,
                priority: task.priority,
                user_id: task.user_id,
                user_name: task.user_name || '',
                user_email: task.user_email || ''
            });
        }
    }, [task]);

    // Fetch users if Admin
    useEffect(() => {
        if (isAdmin) {
            setLoadingUsers(true);
            authService.getAllUsers()
                .then(response => {
                    console.log("Fetched users for dropdown:", response.data.users);
                    setUsers(response.data.users);
                })
                .catch(error => {
                    console.error("Failed to fetch users:", error);
                })
                .finally(() => setLoadingUsers(false));
        }
    }, [isAdmin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUserChange = (e) => {
        const selectedId = e.target.value;
        const selectedUser = users.find(u => u.id === selectedId);

        if (selectedUser) {
            setFormData(prev => ({
                ...prev,
                user_id: selectedUser.id,
                user_name: selectedUser.name,
                user_email: selectedUser.email
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="relative glass-card max-w-lg w-full p-8 transform transition-all animate-scale-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-all"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {task ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {task ? 'Update the details of your task' : 'Fill in the details to create a new task'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-5">
                        <div className="group">
                            <label className="modern-label">Title</label>
                            <input
                                name="title"
                                type="text"
                                required
                                className="modern-input"
                                placeholder="Enter task title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="group">
                            <label className="modern-label">Description</label>
                            <textarea
                                name="description"
                                className="modern-input min-h-[100px] resize-y"
                                placeholder="Enter task description"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        {isAdmin && (
                            <div className="group">
                                <label className="modern-label">Assign To</label>
                                {loadingUsers ? (
                                    <div className="animate-pulse h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                                ) : (
                                    <div className="relative">
                                        <select
                                            name="user_id"
                                            className="modern-input appearance-none cursor-pointer"
                                            value={formData.user_id || ''}
                                            onChange={handleUserChange}
                                        >
                                            <option value="">Original Owner / Select User</option>
                                            {users.map(u => (
                                                <option key={u.id} value={u.id}>
                                                    {u.name} ({u.email})
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-5">
                            <div className="group">
                                <label className="modern-label">Status</label>
                                <div className="relative">
                                    <select
                                        name="status"
                                        className="modern-input appearance-none cursor-pointer"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="group">
                                <label className="modern-label">Priority</label>
                                <div className="relative">
                                    <select
                                        name="priority"
                                        className="modern-input appearance-none cursor-pointer"
                                        value={formData.priority}
                                        onChange={handleChange}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            {task ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
