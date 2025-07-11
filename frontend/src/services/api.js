import axios from 'axios';

// Use environment variable for API base URL so it works for both local and production
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // e.g., https://your-railway-backend-url.up.railway.app/api
});

API.interceptors.request.use((req) => {
    // Use adminInfo token for admin routes, userInfo for others
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    if (isAdminRoute && localStorage.getItem('adminInfo')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('adminInfo')).token}`;
    } else if (localStorage.getItem('userInfo')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
    }
    return req;
});

export const fetchProducts = () => API.get('/products');
export const fetchProduct = (id) => API.get(`/products/${id}`);

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);

export const getOrders = () => API.get('/orders');
export const getUsers = () => API.get('/users');

export const createProduct = (product) => API.post('/products', product);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const updateOrderToDelivered = (id) => API.put(`/orders/${id}/deliver`);

export const fetchAdminStats = () => API.get('/admin/stats');

export const createOrder = (orderData) => API.post('/orders', orderData);

export const deleteOrder = (id) => API.delete(`/orders/${id}`);

export default API; 