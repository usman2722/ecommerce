import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { fetchProduct, updateProduct } from '../services/api';
import { getImageUrl } from '../utils/imageUtils';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', image: '', category: '', stock: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const { data } = await fetchProduct(id);
        setForm({
          name: data.name || '',
          price: data.price || '',
          image: data.image || '',
          category: data.category || '',
          stock: data.stock || '',
          description: data.description || '',
        });
        setError('');
      } catch (err) {
        setError('Failed to load product');
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await updateProduct(id, form);
      setSuccess('Product updated successfully!');
      setTimeout(() => navigate('/admin/products'), 1200);
    } catch (err) {
      setError('Failed to update product');
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 flex items-center justify-center">
        <div className="w-full max-w-xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 rounded-t-2xl px-8 py-6 text-white text-center shadow-lg">
            <h1 className="text-3xl font-extrabold tracking-wide mb-1 drop-shadow">Edit Product</h1>
            <p className="opacity-90">Update the details below to edit this product.</p>
          </div>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl shadow-2xl p-8 space-y-6">
              {error && <div className="bg-red-100 text-red-700 p-2 rounded text-center font-semibold">{error}</div>}
              {success && <div className="bg-green-100 text-green-700 p-2 rounded text-center font-semibold">{success}</div>}
              <div>
                <label className="block font-semibold mb-1 text-blue-800">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full rounded-full px-4 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-semibold shadow-sm" required />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-blue-800">Price</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full rounded-full px-4 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-semibold shadow-sm" required />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-blue-800">Image URL</label>
                <input type="text" name="image" value={form.image} onChange={handleChange} className="w-full rounded-full px-4 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-semibold shadow-sm" required />
                {form.image && (
                  <img src={getImageUrl(form.image)} alt="Preview" className="h-16 w-24 object-cover rounded-xl shadow border-2 border-blue-100 mt-3" />
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1 text-blue-800">Category</label>
                <input type="text" name="category" value={form.category} onChange={handleChange} className="w-full rounded-full px-4 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-semibold shadow-sm" required />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-blue-800">Stock</label>
                <input type="number" name="stock" value={form.stock} onChange={handleChange} className="w-full rounded-full px-4 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-semibold shadow-sm" required />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-blue-800">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} className="w-full rounded-2xl px-4 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-semibold shadow-sm" rows={3} required />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-full shadow-lg transition text-lg mt-2">Update Product</button>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEditProduct; 