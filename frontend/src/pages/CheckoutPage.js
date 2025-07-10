import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';

const CheckoutPage = ({ onCartChange }) => {
    const navigate = useNavigate();
    const [shippingAddress, setShippingAddress] = useState({ address: '', city: '', postalCode: '', country: '' });
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [message, setMessage] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemsPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    useEffect(() => {
        if (!localStorage.getItem('userInfo')) {
            localStorage.setItem('redirectMsg', 'Please log in to continue checkout.');
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
            setMessage('Please fill in all shipping fields.');
            return;
        }
        if (cart.length === 0) {
            setMessage('Your cart is empty.');
            return;
        }
        try {
            await createOrder({
                orderItems: cart.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    product: item.product,
                })),
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });
            localStorage.removeItem('cart');
            if (onCartChange) onCartChange();
            setOrderSuccess(true);
            setTimeout(() => navigate('/'), 2500);
        } catch (err) {
            setMessage('Order failed. Please login and try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-100 via-pink-100 to-purple-200 rounded-3xl shadow-2xl mt-12 border border-purple-100">
            {orderSuccess ? (
                <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                    <svg className="w-20 h-20 mb-6 text-green-500 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent text-center">Thank you for your order!</h2>
                    <p className="text-lg text-gray-700 mb-4 text-center">We appreciate your purchase. Your order has been placed successfully.</p>
                    <p className="text-md text-purple-500 font-semibold">You will be redirected to the homepage shortly.</p>
                </div>
            ) : (
                <>
                    <h1 className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg text-center">Checkout</h1>
                    {message && <div className="mb-4 text-center text-red-600">{message}</div>}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow">Shipping Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" name="address" placeholder="Address" value={shippingAddress.address} onChange={handleChange} className="border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 shadow-sm transition" required />
                            <input type="text" name="city" placeholder="City" value={shippingAddress.city} onChange={handleChange} className="border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 shadow-sm transition" required />
                            <input type="text" name="postalCode" placeholder="Postal Code" value={shippingAddress.postalCode} onChange={handleChange} className="border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 shadow-sm transition" required />
                            <input type="text" name="country" placeholder="Country" value={shippingAddress.country} onChange={handleChange} className="border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 shadow-sm transition" required />
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow">Payment Method</h2>
                        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 shadow-sm transition w-full max-w-xs">
                            <option value="Cash">Cash</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                        </select>
                    </div>
                    <div className="mb-10">
                        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow">Order Summary</h2>
                        <ul className="mb-2">
                            {cart.map(item => (
                                <li key={item.product} className="flex justify-between border-b border-purple-100 py-2 text-lg">
                                    <span className="font-medium text-gray-700">{item.name} <span className="text-xs text-gray-400">x {item.qty}</span></span>
                                    <span className="font-bold text-purple-700">Rs {(item.price * item.qty).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between font-semibold text-gray-700">
                            <span>Items:</span><span>Rs {itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Shipping:</span><span>Rs {shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Tax:</span><span>Rs {taxPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-extrabold mt-4 text-purple-700">
                            <span>Total:</span><span>Rs {totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-full shadow-lg text-lg transition"
                    >
                        Place Order
                    </button>
                    <div className="mt-6 text-center">
                        <Link to="/cart" className="text-purple-600 hover:underline font-semibold">
                            Back to Cart
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default CheckoutPage; 