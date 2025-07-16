import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../services/api';
import AdminLayout from '../components/AdminLayout';
import { getImageUrl } from '../utils/imageUtils';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const { data } = await fetchProducts();
                setProducts(data);
            } catch (error) {
                setError('Failed to fetch products');
            }
            setLoading(false);
        };
        getProducts();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter((p) => p._id !== id));
            } catch (error) {
                setError('Failed to delete product');
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-2 md:p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 gap-2 md:gap-0">
                    <h1 className="text-xl md:text-3xl font-extrabold text-blue-700 drop-shadow-lg">Products</h1>
                    <Link to="/admin/products/new" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-2 px-4 md:px-6 rounded-full font-bold shadow-lg transition text-base md:text-lg w-full md:w-auto text-center">Add Product</Link>
                </div>
                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm md:text-base">{error}</div>}
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full text-xs md:text-sm">
                        <thead className="bg-gradient-to-r from-blue-600 to-purple-500 text-white sticky top-0 z-10">
                            <tr>
                                <th className="py-2 md:py-3 px-2 md:px-4 font-bold">IMAGE</th>
                                <th className="py-2 md:py-3 px-2 md:px-4 font-bold">NAME</th>
                                <th className="py-2 md:py-3 px-2 md:px-4 font-bold">PRICE</th>
                                <th className="py-2 md:py-3 px-2 md:px-4 font-bold">CATEGORY</th>
                                <th className="py-2 md:py-3 px-2 md:px-4 font-bold">STOCK</th>
                                <th className="py-2 md:py-3 px-2 md:px-4 font-bold">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.slice().reverse().map((product) => (
                                <tr key={product._id} className="border-b hover:bg-blue-50 transition">
                                    <td className="px-2 md:px-4 py-2 md:py-3 text-center">
                                        <img src={getImageUrl(product.image)} alt={product.name} className="h-10 w-10 md:h-14 md:w-14 object-cover rounded-xl shadow border-2 border-blue-100 mx-auto" />
                                    </td>
                                    <td className="px-2 md:px-4 py-2 md:py-3 font-semibold text-blue-700 text-center">{product.name}</td>
                                    <td className="px-2 md:px-4 py-2 md:py-3 font-bold text-purple-700 text-center">Rs {Math.round(product.price)}</td>
                                    <td className="px-2 md:px-4 py-2 md:py-3 text-center">{product.category}</td>
                                    <td className="px-2 md:px-4 py-2 md:py-3 text-center">{product.stock}</td>
                                    <td className="px-2 md:px-4 py-2 md:py-3 flex flex-col md:flex-row gap-2 justify-center items-center">
                                        <Link to={`/admin/products/${product._id}/edit`} className="w-full md:w-auto">
                                            <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-full shadow transition w-full md:w-auto">Edit</button>
                                        </Link>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full shadow transition w-full md:w-auto"
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {loading && <div className="text-center py-4">Loading...</div>}
                {!loading && products.length === 0 && <div className="text-center py-4 text-gray-500">No products found.</div>}
            </div>
        </AdminLayout>
    );
};

export default AdminProducts; 