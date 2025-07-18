import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUtils';

const CartPage = ({ onCartChange }) => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(items);
    }, []);

    const removeFromCartHandler = (id) => {
        const newCartItems = cartItems.filter((item) => item.product !== id);
        setCartItems(newCartItems);
        localStorage.setItem('cart', JSON.stringify(newCartItems));
        if (onCartChange) onCartChange();
    };

    const checkoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
            <div className="container mx-auto px-8 sm:px-0">
                <h1 className="text-4xl font-extrabold mb-8 text-blue-800 text-center drop-shadow">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty Cart" className="w-32 h-32 mb-6 opacity-80" />
                        <div className="text-xl text-gray-500 mb-4">Your cart is empty</div>
                        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full shadow transition">Go Back</Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                {cartItems.map((item) => (
                                    <div key={item.product} className="flex items-center mb-6 pb-6 border-b last:border-b-0 last:mb-0 last:pb-0">
                                        <img src={getImageUrl(item.image)} alt={item.name} className="w-24 h-24 object-cover rounded-xl mr-6 border-2 border-blue-100 shadow" />
                                        <div className="flex-1">
                                            <Link to={`/product/${item.product}`} className="text-lg font-bold text-blue-700 hover:underline">{item.name}</Link>
                                            <div className="text-gray-500 text-sm mt-1">Price: <span className="font-semibold text-blue-700">Rs {item.price}</span></div>
                                        </div>
                                        <div className="w-28 flex items-center gap-2">
                                            <select
                                                value={item.qty}
                                                onChange={(e) => {
                                                    const newCartItems = cartItems.map((x) =>
                                                        x.product === item.product ? { ...x, qty: Number(e.target.value) } : x
                                                    );
                                                    setCartItems(newCartItems);
                                                    localStorage.setItem('cart', JSON.stringify(newCartItems));
                                                    if (onCartChange) onCartChange();
                                                }}
                                                className="bg-blue-50 text-blue-700 font-semibold rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 border-0 shadow-sm transition appearance-none cursor-pointer"
                                                style={{ minWidth: 48 }}
                                            >
                                                {[...Array(item.stock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => removeFromCartHandler(item.product)}
                                                className="ml-2 text-red-600 hover:text-red-800 text-xl bg-red-100 rounded-full w-8 h-8 flex items-center justify-center"
                                                title="Delete"
                                            >
                                                &#128465;
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                                <h2 className="text-2xl font-bold mb-4 text-blue-800">Order Summary</h2>
                                <div className="flex justify-between mb-2 text-lg">
                                    <span>Items:</span>
                                    <span className="font-semibold">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                                </div>
                                <div className="flex justify-between mb-4 text-lg">
                                    <span>Total:</span>
                                    <span className="font-bold text-purple-700 text-2xl">Rs {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                                </div>
                                <button
                                    type="button"
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-full shadow-lg transition text-lg mt-4"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage; 