import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, updateOrderToDelivered, deleteOrder } from '../services/api';
import AdminLayout from '../components/AdminLayout';
import Swal from 'sweetalert2';
import { getImageUrl } from '../utils/imageUtils';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await getOrders();
                // Sort orders by createdAt descending (latest first)
                const sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sorted);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOrders();
    }, []);

    const deliverHandler = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Mark this order as delivered?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, deliver it!'
        });
        if (result.isConfirmed) {
            try {
                const updated = await updateOrderToDelivered(id);
                setOrders(orders.map(order => order._id === id ? updated.data : order));
                Swal.fire('Delivered!', 'Order has been marked as delivered.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Failed to mark as delivered.', 'error');
            }
        }
    };

    const deleteHandler = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Delete this delivered order?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            try {
                await deleteOrder(id);
                setOrders(orders.filter((order) => order._id !== id));
                Swal.fire('Deleted!', 'Order has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Failed to delete order.', 'error');
            }
        }
    };

    function isValidObjectId(id) {
        return /^[a-fA-F0-9]{24}$/.test(id);
    }

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-extrabold mb-8 text-blue-800 text-center drop-shadow">Orders</h1>
                    <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gradient-to-r from-blue-600 to-purple-500 text-white sticky top-0 z-10">
                                <tr>
                                    <th className="py-3 px-4 font-bold">IMAGE</th>
                                    <th className="py-3 px-4 font-bold">ID</th>
                                    <th className="py-3 px-4 font-bold">USER</th>
                                    <th className="py-3 px-4 font-bold">DATE</th>
                                    <th className="py-3 px-4 font-bold">TOTAL</th>
                                    <th className="py-3 px-4 font-bold">PAID</th>
                                    <th className="py-3 px-4 font-bold">DELIVERED</th>
                                    <th className="py-3 px-4 font-bold">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-blue-50 transition">
                                        <td className="px-4 py-3 text-center">
                                            {order.orderItems && order.orderItems[0] && (
                                                <img
                                                    src={getImageUrl(order.orderItems[0].image)}
                                                    alt={order.orderItems[0].name}
                                                    className="w-14 h-14 object-cover rounded-xl shadow mx-auto border-2 border-blue-100"
                                                />
                                            )}
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-gray-700">{order._id}</td>
                                        <td className="px-4 py-3 font-semibold text-blue-700">{order.user && order.user.name}</td>
                                        <td className="px-4 py-3">{order.createdAt.substring(0, 10)}</td>
                                        <td className="px-4 py-3 font-bold text-purple-700">Rs {Math.round(order.totalPrice)}</td>
                                        <td className="px-4 py-3">
                                            {order.isPaid && order.paidAt
                                                ? <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{order.paidAt.substring(0, 10)}</span>
                                                : <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">No</span>
                                            }
                                        </td>
                                        <td className="px-4 py-3">
                                            {order.isDelivered && order.deliveredAt
                                                ? <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{order.deliveredAt.substring(0, 10)}</span>
                                                : <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">No</span>
                                            }
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2 justify-center">
                                                <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-full shadow transition" onClick={() => setSelectedOrder(order)}>
                                                    Details
                                                </button>
                                                {!order.isDelivered && (
                                                    <button
                                                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-full shadow transition"
                                                        onClick={() => deliverHandler(order._id)}
                                                    >
                                                        Delivered
                                                    </button>
                                                )}
                                                {order.isDelivered && isValidObjectId(order._id) && (
                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full shadow transition"
                                                        onClick={() => deleteHandler(order._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl relative">
                        <button className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-blue-700" onClick={() => setSelectedOrder(null)}>&times;</button>
                        <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">Order Details</h2>
                        <div className="mb-3 flex flex-col gap-2">
                            <div><b>Order ID:</b> <span className="font-mono text-xs">{selectedOrder._id}</span></div>
                            <div><b>User:</b> {selectedOrder.user && selectedOrder.user.name}</div>
                            <div><b>Date:</b> {selectedOrder.createdAt.substring(0, 10)}</div>
                            <div><b>Total:</b> <span className="font-bold text-purple-700">Rs {Math.round(selectedOrder.totalPrice)}</span></div>
                            <div><b>Paid:</b> {selectedOrder.isPaid ? selectedOrder.paidAt.substring(0, 10) : <span className="text-red-600 font-bold">No</span>}</div>
                            <div><b>Delivered:</b> {selectedOrder.isDelivered ? selectedOrder.deliveredAt.substring(0, 10) : <span className="text-red-600 font-bold">No</span>}</div>
                            <div><b>Shipping Address:</b> {selectedOrder.shippingAddress && `${selectedOrder.shippingAddress.address}, ${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.postalCode}, ${selectedOrder.shippingAddress.country}`}</div>
                            <div><b>Payment Method:</b> {selectedOrder.paymentMethod}</div>
                        </div>
                        <div className="mb-2"><b>Order Items:</b></div>
                        <ul className="mb-2 pl-4 list-disc">
                            {selectedOrder.orderItems.map(item => (
                                <li key={item.product} className="flex items-center gap-3 mb-2">
                                    <img
                                        src={getImageUrl(item.image)}
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded-xl shadow border border-blue-100"
                                    />
                                    <span className="text-gray-700">{item.name} <span className="text-xs text-gray-400">x {item.qty}</span> <span className="text-xs text-blue-700">(Rs {Math.round(item.price)} each)</span></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminOrders; 