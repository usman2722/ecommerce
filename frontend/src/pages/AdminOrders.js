import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, updateOrderToDelivered, deleteOrder } from '../services/api';
import AdminLayout from '../components/AdminLayout';
import Swal from 'sweetalert2';
import { getImageUrl } from '../utils/imageUtils';
import { FaEye, FaCheck, FaTrash } from 'react-icons/fa';

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
                    {/* Mobile card layout */}
                    <div className="block md:hidden">
                      {orders.map(order => (
                        <div key={order._id} className="bg-white rounded-xl shadow p-4 mb-4">
                          <div className="flex items-center gap-4 mb-2">
                            {order.orderItems && order.orderItems[0] && (
                              <img
                                src={getImageUrl(order.orderItems[0].image)}
                                alt={order.orderItems[0].name}
                                className="w-16 h-16 object-cover rounded-xl border-2 border-blue-100"
                              />
                            )}
                            <div className="flex-1">
                              <div className="font-bold text-blue-700 text-sm">{order.user && order.user.name}</div>
                              <div className="text-xs text-gray-500">{order.createdAt.substring(0, 10)}</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-700 mb-1"><b>ID:</b> <span className="font-mono">{order._id}</span></div>
                          <div className="text-xs text-purple-700 mb-1"><b>Total:</b> Rs {Math.round(order.totalPrice)}</div>
                          <div className="text-xs text-blue-700 mb-1"><b>Qty:</b> {order.orderItems.reduce((sum, item) => sum + (item.qty || 0), 0)}</div>
                          <div className="flex gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.isPaid && order.paidAt ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{order.isPaid && order.paidAt ? order.paidAt.substring(0, 10) : 'No'}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.isDelivered && order.deliveredAt ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{order.isDelivered && order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'No'}</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-full shadow transition text-xs" onClick={() => setSelectedOrder(order)}>
                              Details
                            </button>
                            {!order.isDelivered && (
                              <button
                                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-full shadow transition text-xs"
                                onClick={() => deliverHandler(order._id)}
                              >
                                Delivered
                              </button>
                            )}
                            {order.isDelivered && isValidObjectId(order._id) && (
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full shadow transition text-xs"
                                onClick={() => deleteHandler(order._id)}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Desktop table layout */}
                    <div className="hidden md:block w-full overflow-x-auto rounded-2xl shadow-lg bg-white">
                        <table className="min-w-full text-xs md:text-sm">
                            <thead className="bg-gradient-to-r from-blue-600 to-purple-500 text-white sticky top-0 z-10">
                                <tr>
                                    <th className="py-2 md:py-3 px-2 md:px-4 font-bold text-center text-xs md:text-sm">IMAGE</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 font-bold text-center text-xs md:text-sm hidden md:table-cell">ID</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 font-bold text-center text-xs md:text-sm">USER</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 font-bold text-center text-xs md:text-sm">DATE</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 font-bold text-center text-xs md:text-sm">TOTAL</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 font-bold text-center text-xs md:text-sm">QTY</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 font-bold text-center text-xs md:text-sm">PAID</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 font-bold text-center text-xs md:text-sm">DELIVERED</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 font-bold text-center text-xs md:text-sm">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-blue-50 transition">
                                        <td className="px-1 py-1 text-center text-xs">
                                            {order.orderItems && order.orderItems[0] && (
                                                <img
                                                    src={getImageUrl(order.orderItems[0].image)}
                                                    alt={order.orderItems[0].name}
                                                    className="w-14 h-14 object-cover rounded-xl shadow mx-auto border-2 border-blue-100"
                                                />
                                            )}
                                        </td>
                                        <td className="px-1 py-1 font-mono text-xs text-gray-700 text-center hidden md:table-cell">{order._id}</td>
                                        <td className="px-1 py-1 font-semibold text-blue-700 text-center text-xs">{order.user && order.user.name}</td>
                                        <td className="px-1 py-1 text-center text-xs">{order.createdAt.substring(0, 10)}</td>
                                        <td className="px-1 py-1 font-bold text-purple-700 text-center text-xs">Rs {Math.round(order.totalPrice)}</td>
                                        <td className="px-1 py-1 font-bold text-blue-700 text-center text-xs">{order.orderItems.reduce((sum, item) => sum + (item.qty || 0), 0)}</td>
                                        <td className="px-1 py-1 text-center text-xs">
                                            {order.isPaid && order.paidAt
                                                ? <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{order.paidAt.substring(0, 10)}</span>
                                                : <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">No</span>
                                            }
                                        </td>
                                        <td className="px-1 py-1 text-center text-xs">
                                            {order.isDelivered && order.deliveredAt
                                                ? <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{order.deliveredAt.substring(0, 10)}</span>
                                                : <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">No</span>
                                            }
                                        </td>
                                        <td className="px-1 py-1 text-center text-xs">
                                            {/* Mobile: show icons */}
                                            <div className="flex gap-1 justify-center items-center md:hidden">
                                                <button title="Details" className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full shadow transition" onClick={() => setSelectedOrder(order)}>
                                                    <FaEye size={14} />
                                                </button>
                                                {!order.isDelivered && (
                                                    <button
                                                        title="Mark as Delivered"
                                                        className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-full shadow transition"
                                                        onClick={() => deliverHandler(order._id)}
                                                    >
                                                        <FaCheck size={14} />
                                                    </button>
                                                )}
                                                {order.isDelivered && isValidObjectId(order._id) && (
                                                    <button
                                                        title="Delete"
                                                        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow transition"
                                                        onClick={() => deleteHandler(order._id)}
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                )}
                                            </div>
                                            {/* Desktop: show text buttons */}
                                            <div className="hidden md:flex gap-2 justify-center items-center">
                                                <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-full shadow transition text-xs md:text-sm" onClick={() => setSelectedOrder(order)}>
                                                    Details
                                                </button>
                                                {!order.isDelivered && (
                                                    <button
                                                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-full shadow transition text-xs md:text-sm"
                                                        onClick={() => deliverHandler(order._id)}
                                                    >
                                                        Delivered
                                                    </button>
                                                )}
                                                {order.isDelivered && isValidObjectId(order._id) && (
                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full shadow transition text-xs md:text-sm"
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