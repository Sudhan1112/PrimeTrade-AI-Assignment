import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LogOut, LayoutDashboard, User, Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-sm transition-colors duration-300 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">PrimeTrade AI</Link>
                        </div>
                        {user && (
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    to="/dashboard"
                                    className="border-indigo-500 text-gray-900 dark:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                >
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    Dashboard
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform hover:scale-110 active:scale-95"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    {user.name} ({user.role})
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-md text-gray-400 hover:text-red-500 dark:hover:text-red-400 focus:outline-none transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Login</Link>
                                <Link to="/register" className="btn-primary !w-auto !py-2 px-6 shadow-md">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
