import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import logo from '../logo.svg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';

const Header = ({ cartCount, theme = 'default' }) => {
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/';
    };

    const headerClass = 'bg-gradient-to-br from-blue-100 via-pink-100 to-purple-200 bg-opacity-80 shadow-2xl sticky top-0 z-50 transition-colors duration-300';

    return (
        <header className={headerClass}>
            <div className="container mx-auto flex items-center py-3 px-8 sm:px-0 relative">
                <Link to="/" className="flex items-center gap-2">
                    <img src="https://marketplace.canva.com/EAFzjXx_i5w/1/0/1600w/canva-blue-illustrative-e-commerce-online-shop-logo-fZejT2DpGCw.jpg" alt="E-Commerce Logo" className="h-10 w-10 object-contain" />
                    <span className="text-2xl font-extrabold text-gray-800 tracking-tight">ShopEase</span>
                </Link>
                {/* Hamburger menu for mobile */}
                <button
                    className="ml-auto md:hidden text-gray-700 hover:text-blue-600 focus:outline-none text-3xl"
                    onClick={() => setMobileMenuOpen((open) => !open)}
                >
                    {/* Hamburger icon */}
                    <span>{mobileMenuOpen ? '\u2715' : '\u2630'}</span>
                </button>
                {/* Desktop nav */}
                <nav className="flex-grow justify-center hidden md:flex">
                    <div className="flex items-center gap-4 md:gap-6 lg:gap-8 text-base md:text-lg lg:text-xl font-medium">
                        <Link to="/" className={location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition'}>Home</Link>
                        <Link to="/categories" className={location.pathname === '/categories' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition'}>Categories</Link>
                        <Link to="/about" className={location.pathname === '/about' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition'}>About</Link>
                        <Link to="/contact" className={location.pathname === '/contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition'}>Contact Us</Link>
                        {userInfo && userInfo.role === 'admin' && (
                            <Link to="/admin" className={location.pathname.startsWith('/admin') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition'}>Admin Panel</Link>
                        )}
                    </div>
                </nav>
                {/* Desktop icons */}
                <div className="hidden md:flex items-center gap-2 md:gap-3 lg:gap-4 ml-2 md:ml-4 lg:ml-6 relative">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition">
                        <FacebookIcon style={{ fontSize: 28 }} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition">
                        <TwitterIcon style={{ fontSize: 28 }} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition">
                        <InstagramIcon style={{ fontSize: 28 }} />
                    </a>
                    <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition flex items-center">
                        <ShoppingCartIcon style={{ fontSize: 32 }} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2 py-0.5 text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    {/* User login/avatar dropdown */}
                    {userInfo ? (
                        <div className="relative">
                            <button
                                className="flex items-center text-gray-700 hover:text-blue-600 transition focus:outline-none"
                                onClick={() => setDropdownOpen((open) => !open)}
                            >
                                <AccountCircleIcon style={{ fontSize: 32 }} />
                                <span className="ml-2 font-semibold">{userInfo.name || userInfo.email}</span>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="text-gray-700 hover:text-blue-600 transition flex items-center">
                            <LoginIcon style={{ fontSize: 32 }} />
                        </Link>
                    )}
                </div>
                {/* Mobile menu dropdown */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-2xl z-40 flex flex-col md:hidden animate-fade-in">
                        <nav className="flex flex-col items-center gap-4 py-4 text-lg font-medium">
                            <Link to="/" className={location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition'} onClick={() => setMobileMenuOpen(false)}>Home</Link>
                            <Link to="/categories" className={location.pathname === '/categories' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition'} onClick={() => setMobileMenuOpen(false)}>Categories</Link>
                            <Link to="/about" className={location.pathname === '/about' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition'} onClick={() => setMobileMenuOpen(false)}>About</Link>
                            <Link to="/contact" className={location.pathname === '/contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition'} onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
                            {userInfo && userInfo.role === 'admin' && (
                                <Link to="/admin" className={location.pathname.startsWith('/admin') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition'} onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>
                            )}
                            <div className="flex items-center gap-4 mt-2">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition">
                                    <FacebookIcon style={{ fontSize: 28 }} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition">
                                    <TwitterIcon style={{ fontSize: 28 }} />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition">
                                    <InstagramIcon style={{ fontSize: 28 }} />
                                </a>
                                <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition flex items-center" onClick={() => setMobileMenuOpen(false)}>
                                    <ShoppingCartIcon style={{ fontSize: 32 }} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2 py-0.5 text-white">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                {userInfo ? (
                                    <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 transition flex items-center">
                                        <AccountCircleIcon style={{ fontSize: 32 }} />
                                        <span className="ml-2 font-semibold">Logout</span>
                                    </button>
                                ) : (
                                    <Link to="/login" className="text-gray-700 hover:text-blue-600 transition flex items-center">
                                        <LoginIcon style={{ fontSize: 32 }} />
                                    </Link>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header; 