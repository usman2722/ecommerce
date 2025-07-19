import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../services/api';
import { FaUserShield } from 'react-icons/fa';

const AdminLoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await signIn(formData);
            if (data.role === 'admin') {
                localStorage.setItem('adminInfo', JSON.stringify(data));
                navigate('/admin');
            } else {
                setError('Access denied: Not an admin account.');
            }
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400">
            <div className="w-full max-w-xs sm:max-w-md bg-white rounded-2xl shadow-2xl px-2 py-6 sm:px-8 sm:py-10 flex flex-col items-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-4 mb-4 shadow-lg">
                    <FaUserShield className="text-white text-4xl" />
                </div>
                <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-wide">Admin Login</h1>
                {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-center w-full">{error}</div>}
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            id="email"
                            type="email"
                            placeholder="Admin Email"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            id="password"
                            type="password"
                            placeholder="••••••••••"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="submit"
                    >
                        Sign In
                    </button>
                </form>
                <div className="w-full mt-4 text-center">
                  <span className="text-gray-600 text-sm">Don't have an admin account? </span>
                  <Link to="/admin-signup" className="text-blue-600 font-bold hover:underline">Sign up as Admin</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage; 