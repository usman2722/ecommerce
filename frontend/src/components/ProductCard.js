import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUtils';

const ProductCard = ({ product, onAddToCart }) => {
    const handleAddToCart = (e) => {
        e.preventDefault();
        if (onAddToCart) onAddToCart();
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 border border-transparent hover:scale-105 hover:shadow-2xl hover:border-purple-400">
            <div className="relative">
                <Link to={`/product/${product._id}`}>
                    <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-64 object-cover" />
                </Link>
                {product.category && (
                    <span className="absolute top-2 left-2 bg-blue-700 bg-opacity-80 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {product.category}
                    </span>
                )}
            </div>
            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h2 className="text-xl font-bold">{product.name}</h2>
                </Link>
                <p className="text-gray-600">${product.price}</p>
                <button
                    className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full w-full shadow-lg transition"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;