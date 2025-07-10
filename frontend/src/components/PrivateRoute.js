import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ adminOnly = false, children }) => {
    const userInfo = adminOnly
        ? JSON.parse(localStorage.getItem('adminInfo'))
        : JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && userInfo.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute; 