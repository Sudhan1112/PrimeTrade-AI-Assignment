import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import taskService from '../../services/task.service';
import Stats from './Stats';
import TaskForm from '../Tasks/TaskForm';
import { Plus, Edit2, Trash2, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Filter State
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        status: '',
        priority: ''
    });
    const [pagination, setPagination] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [tasksRes, statsRes] = await Promise.all([
                taskService.getAll(filters),
                taskService.getStats()
            ]);
            setTasks(tasksRes.data.tasks);
            setPagination(tasksRes.data.pagination);
            setStats(statsRes.data.stats);
        } catch (error) {
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters]); // Re-fetch when filters change

    const handleCreate = async (data) => {
        try {
            await taskService.create(data);
            toast.success('Task created successfully');
            setIsFormOpen(false);
            fetchData();
        } catch (error) {
            toast.error('Failed to create task');
        }
    };

    const handleUpdate = async (data) => {
        try {
            await taskService.update(editingTask.id, data);
            toast.success('Task updated successfully');
            setEditingTask(null);
            setIsFormOpen(false);
            fetchData();
        } catch (error) {
            toast.error('Failed to update task');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await taskService.delete(id);
            toast.success("Task deleted");
            fetchData();
        } catch (error) {
            toast.error("Failed to delete task");
        }
    }

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    }

    const openCreateModal = () => {
        setEditingTask(null);
        setIsFormOpen(true);
    }

    // Helpers for badges
    const getPriorityColor = (p) => {
        switch (p) {
            case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    }

    const getStatusColor = (s) => {
        switch (s) {
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Welcome back, {user?.name}</p>
            </div>

            <div className="mb-8 transform hover:scale-[1.01] transition-transform duration-300">
                <Stats stats={stats} />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Tasks</h3>
                    <button
                        onClick={openCreateModal}
                        className="btn-primary flex items-center text-sm !w-auto !py-2 px-4 shadow-md"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Task
                    </button>
                </div>

                {/* Filters */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-600 flex flex-wrap gap-4 items-center bg-white dark:bg-gray-800">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Filter className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Filters:</span>
                    </div>
                    <div className="relative">
                        <select
                            className="modern-input py-2 pl-3 pr-10 text-sm min-w-[140px] appearance-none cursor-pointer"
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    <div className="relative">
                        <select
                            className="modern-input py-2 pl-3 pr-10 text-sm min-w-[140px] appearance-none cursor-pointer"
                            value={filters.priority}
                            onChange={(e) => setFilters({ ...filters, priority: e.target.value, page: 1 })}
                        >
                            <option value="">All Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Task List Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assigned To</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {loading ? (
                                <tr><td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">Loading...</td></tr>
                            ) : tasks.length === 0 ? (
                                <tr><td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No tasks found. Create one!</td></tr>
                            ) : (
                                tasks.map((task) => (
                                    <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{task.description}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={clsx("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", getStatusColor(task.status))}>
                                                {task.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={clsx("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", getPriorityColor(task.priority))}>
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(task.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900 dark:text-white">{task.user_name || 'Unknown'}</span>
                                                <span className="text-xs text-gray-400 dark:text-gray-500">{task.user_email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => openEditModal(task)}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4 transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task.id)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button onClick={() => setFilters({ ...filters, page: filters.page - 1 })} disabled={filters.page === 1} className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">Previous</button>
                            <button onClick={() => setFilters({ ...filters, page: filters.page + 1 })} disabled={filters.page === pagination.totalPages} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">Next</button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing page <span className="font-medium">{pagination.page}</span> of <span className="font-medium">{pagination.totalPages}</span>
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                                        disabled={filters.page === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                                        disabled={filters.page === pagination.totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isFormOpen && (
                <TaskForm
                    task={editingTask}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={editingTask ? handleUpdate : handleCreate}
                />
            )}
        </div>
    );
};

export default Dashboard;
