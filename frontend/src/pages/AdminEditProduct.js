import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { fetchProduct, updateProduct } from '../services/api';
import { getImageUrl } from '../utils/imageUtils';
import axios from 'axios';
import API from '../services/api';

const CATEGORY_OPTIONS = ['Electronics', 'Fashion', 'Sports', 'Other'];

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', image: '', category: '', stock: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [customCategory, setCustomCategory] = useState('');

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
        // Set preview to current image
        if (data.image) {
          setPreview(data.image);
        }
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

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'Other') {
      setForm({ ...form, category: '' });
    } else {
      setForm({ ...form, category: value });
      setCustomCategory('');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file)); // Show instant preview
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    setError('');
    try {
      const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
      const { data } = await API.post('/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${adminInfo?.token}`,
        },
      });
      setForm((prev) => ({ ...prev, image: data.image }));
      setPreview(data.image); // After upload, show Cloudinary image
      setSuccess('Image uploaded successfully!');
    } catch (err) {
      setError('Image upload failed.');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    const submitForm = { ...form };
    if (CATEGORY_OPTIONS.includes(form.category) === false && customCategory) {
      submitForm.category = customCategory;
    }
    try {
      await updateProduct(id, submitForm);
      setSuccess('Product updated successfully!');
      setTimeout(() => navigate('/admin/products'), 1200);
    } catch (err) {
      setError('Failed to update product');
    }
  };

  const backendBaseUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL.replace('/api', '')
    : 'http://localhost:5000';

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
                <label className="block font-semibold mb-1 text-blue-800">Product Image</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="rounded-full px-4 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-semibold shadow-sm border-0"
                  />
                  {uploading && <span className="text-blue-600 font-semibold">Uploading...</span>}
                  {preview && (
                    <img src={preview.startsWith('http') ? preview : `${backendBaseUrl}${preview}`} alt="Preview" className="h-16 w-24 object-cover rounded-xl shadow border-2 border-blue-100" />
                  )}
                </div>
                <input type="hidden" name="image" value={form.image} />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-blue-800">Category</label>
                <select
                  name="category"
                  value={CATEGORY_OPTIONS.includes(form.category) ? form.category : (form.category ? 'Other' : '')}
                  onChange={handleCategoryChange}
                  className="w-full rounded-full px-4 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-semibold shadow-sm mb-2 border-0"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {CATEGORY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {((form.category === '' && customCategory !== '') || form.category === 'Other') && (
                  <input
                    type="text"
                    name="customCategory"
                    value={customCategory}
                    onChange={e => setCustomCategory(e.target.value)}
                    placeholder="Enter new category"
                    className="w-full rounded-full px-4 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 font-semibold shadow-sm mt-1 border-0"
                    required
                  />
                )}
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