import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => (
  <footer className="bg-blue-900 text-white py-4 mt-0 shadow-inner">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-start gap-8 px-4">
      <div className="mb-4 md:mb-0 flex flex-col items-center md:items-start px-4 md:px-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-extrabold text-white tracking-tight drop-shadow-lg">ShopEase</span>
        </div>
        <p className="text-blue-100 max-w-xs text-sm mb-2 text-center md:text-left">Your one-stop shop for the latest trends and best deals. Quality, value, and service you can trust.</p>
        <div className="flex justify-center md:justify-start gap-4 mt-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-blue-400 transition">
            <FacebookIcon style={{ fontSize: 28 }} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-blue-400 transition">
            <TwitterIcon style={{ fontSize: 28 }} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-pink-300 transition">
            <InstagramIcon style={{ fontSize: 28 }} />
          </a>
        </div>
      </div>
      <div className="items-start px-4 md:px-0">
        <h4 className="font-bold mb-2 text-white drop-shadow">Quick Links</h4>
        <ul className="space-y-1 text-sm">
          <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
          <li><Link to="/categories" className="hover:text-blue-400">Categories</Link></li>
          <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
        </ul>
      </div>
      <div className="items-start px-4 md:px-0">
        <h4 className="font-bold mb-2 text-white drop-shadow">Contact</h4>
        <ul className="text-sm space-y-1">
          <li>Email: <a href="mailto:support@shopease.com" className="hover:text-blue-400">support@shopease.com</a></li>
          <li>Phone: <a href="tel:+1234567890" className="hover:text-blue-400">+1 (234) 567-890</a></li>
          <li>Address: 123 Market St, City, Country</li>
        </ul>
      </div>
    </div>
    <div className="text-center text-blue-200 text-xs mt-8">&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</div>
  </footer>
);

export default Footer; 