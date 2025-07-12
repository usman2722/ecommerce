import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct } from '../services/api';
import { getImageUrl } from '../utils/imageUtils';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await fetchProduct(id);
                setProduct(data);
            } catch (error) {
                console.error(error);
            }
        };
        getProduct();
    }, [id]);

    const addToCartHandler = () => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const existItem = cartItems.find((x) => x.product === product._id);

        if (existItem) {
            const newCartItems = cartItems.map((x) =>
                x.product === existItem.product ? { ...existItem, qty } : x
            );
            localStorage.setItem('cart', JSON.stringify(newCartItems));
        } else {
            const newCartItems = [...cartItems, {
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                stock: product.stock,
                qty,
            }];
            localStorage.setItem('cart', JSON.stringify(newCartItems));
        }
        navigate('/cart');
    };


    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="mx-auto mt-8 rounded-2xl shadow-xl object-contain"
                        style={{ maxWidth: '350px', maxHeight: '350px', width: '100%', height: 'auto' }}
                    />
                </div>
                <div className="mt-8 md:mt-16">
                    <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
                        {product.name}
                    </h1>
                    <p className="text-gray-700 mb-6 text-lg" style={{ marginTop: '18px' }}>{product.description}</p>
                    <p className="text-2xl font-extrabold mb-6 text-purple-700" style={{ marginTop: '18px' }}>
                        Rs {product.price}
                    </p>
                    <div className="flex items-center mb-4">
                        <span className="mr-2">Qty</span>
                        <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                            {[...Array(product.stock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition"
                        onClick={addToCartHandler}
                        disabled={product.stock === 0}
                        style={{ marginTop: '24px' }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage; 