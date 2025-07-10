import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../services/api'; // Assuming you have this service
import { getUsers } from '../services/api'; // Assuming you have this service
import { getProducts } from '../services/api'; // Assuming you have this service
import { fetchAdminStats } from '../services/api';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // These API calls need to be implemented and protected
                // const { data: ordersData } = await getOrders();
                // const { data: usersData } = await getUsers();
                // const { data: productsData } = await getProducts();
                // setOrders(ordersData);
                // setUsers(usersData);
                // setProducts(productsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const getStats = async () => {
            try {
                const { data } = await fetchAdminStats();
                setStats(data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        getStats();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 shadow">
                    <h2 className="text-xl font-bold">Total Products</h2>
                    <p className="text-2xl">{stats.totalProducts}</p>
                </div>
                <div className="bg-white p-4 shadow">
                    <h2 className="text-xl font-bold">Total Orders</h2>
                    <p className="text-2xl">{stats.totalOrders}</p>
                </div>
                <div className="bg-white p-4 shadow">
                    <h2 className="text-xl font-bold">Total Users</h2>
                    <p className="text-2xl">{stats.totalUsers}</p>
                </div>
                <div className="bg-white p-4 shadow">
                    <h2 className="text-xl font-bold">Total Banners</h2>
                    <p className="text-2xl">{stats.totalBanners}</p>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Admin Navigation</h2>
                <Link to="/admin/products" className="bg-gray-800 text-white py-2 px-4 rounded mr-4">
                    Manage Products
                </Link>
                <Link to="/admin/orders" className="bg-gray-800 text-white py-2 px-4 rounded">
                    Manage Orders
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard; 