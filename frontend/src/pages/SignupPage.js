import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/api';

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const { data } = await signUp(formData);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-pink-50 to-purple-100 px-2">
            <div className="w-full max-w-xs sm:max-w-md bg-gradient-to-br from-white via-blue-100 to-pink-100 border border-blue-200 rounded-2xl shadow-2xl px-1 py-4 sm:px-4 sm:py-6 flex flex-col items-center">
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-1">
                    <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent tracking-wide">Sign Up</h1>
                    <div className="mb-2">
                        <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-400"
                            id="name"
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-400"
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-400"
                            id="password"
                            type="password"
                            placeholder="******************"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-400"
                            id="confirmPassword"
                            type="password"
                            placeholder="******************"
                            name="confirmPassword"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="w-full mt-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <div className="w-full mt-2 text-center">
                        <span className="text-purple-600 text-sm">Already have an account? </span>
                        <Link to="/login" className="text-pink-500 font-bold hover:text-purple-600 hover:underline">Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage; 