import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, TextField, Button, Card, CardContent, Avatar } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import AdminLayout from '../components/AdminLayout';
import { fetchAdminStats, createProduct } from '../services/api';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 3890 },
];

const categoryData = [
  { name: 'Electronics', value: 20 },
  { name: 'Clothing', value: 10 },
  { name: 'Home', value: 4 },
];
const COLORS = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#f67019', '#00c49f', '#ffbb28'];

const statCards = [
  { label: 'Users', icon: <PeopleIcon />, color: '#1976d2', key: 'totalUsers' },
  { label: 'Products', icon: <InventoryIcon />, color: '#388e3c', key: 'totalProducts' },
  { label: 'Orders', icon: <ShoppingCartIcon />, color: '#fbc02d', key: 'totalOrders' },
  { label: 'Sales', icon: <MonetizationOnIcon />, color: '#d32f2f', key: 'totalSales' },
  { label: 'Banners', icon: <PhotoLibraryIcon />, color: '#7b1fa2', key: 'totalBanners' },
];

const cardGradients = [
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // Users
  'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // Products
  'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', // Orders
  'linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)', // Sales
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', // Banners
];

export default function AdminDashboardNew() {
  const [form, setForm] = useState({ name: '', price: '', image: '', category: '', stock: '', description: '' });
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0, totalSales: 0, salesOverTime: [], categoryStats: [], topSellingProducts: [] });
  const [message, setMessage] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const { data } = await fetchAdminStats();
        setStats({
          ...data,
          salesOverTime: data.salesOverTime || [],
          categoryStats: data.categoryStats || [],
          topSellingProducts: data.topSellingProducts || [],
        });
      } catch (err) {
        // fallback to dummy data if error
        setStats({ totalUsers: 120, totalProducts: 34, totalOrders: 87, totalSales: 12340, salesOverTime: [], categoryStats: [], topSellingProducts: [] });
      }
    };
    getStats();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(form);
      setMessage('Product added successfully!');
      setForm({ name: '', price: '', image: '', category: '', stock: '', description: '' });
    } catch (err) {
      setMessage('Error adding product.');
    }
  };

  // Card detail content
  const getCardDetail = (card) => {
    switch (card.key) {
      case 'totalUsers':
        return <div><b>Total Users:</b> {stats.totalUsers}<br/>Users registered in the system.</div>;
      case 'totalProducts':
        return <div><b>Total Products:</b> {stats.totalProducts}<br/>Products currently listed.</div>;
      case 'totalOrders':
        return <div><b>Total Orders:</b> {stats.totalOrders}<br/>Orders placed by users.</div>;
      case 'totalSales':
        return <div><b>Total Sales:</b> Rs {Math.round(stats.totalSales || 0)}<br/>Total revenue from all orders.</div>;
      case 'totalBanners':
        return <div><b>Total Banners:</b> {stats.totalBanners}<br/>Banners currently active.</div>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 0, background: '#f4f6f8', minHeight: '100vh', width: '100%' }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="h3"
            gutterBottom
            fontWeight={900}
            sx={{
              mt: 0,
              mb: 3,
              fontFamily: 'Roboto, sans-serif',
              textAlign: 'center',
              letterSpacing: 1,
              color: '#1d4ed8', // blue-700
              textShadow: '0 2px 8px rgba(29,78,216,0.08)',
              display: 'block',
              lineHeight: 1.2,
              mx: 'auto',
              width: 'fit-content',
            }}
          >
            Admin Dashboard
          </Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ mb: 3, mt: 8 }}>
            {statCards.slice(0, 4).map((card, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={card.label}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 2,
                    boxShadow: 6,
                    borderRadius: 6,
                    background: cardGradients[idx],
                    backdropFilter: 'blur(8px)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
                    '&:hover': {
                      boxShadow: 12,
                      transform: 'scale(1.07)',
                      borderColor: '#1976d2',
                    },
                    minHeight: 110,
                    width: 180,
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedCard(card)}
                >
                  <Avatar sx={{ bgcolor: card.color, mb: 1, width: 56, height: 56, fontSize: 32, transition: 'transform 0.3s', '&:hover': { transform: 'rotate(-12deg) scale(1.15)' } }}>
                    {card.icon}
                  </Avatar>
                  <CardContent sx={{ p: 0, textAlign: 'center' }}>
                    <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>
                      {card.label}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                      <span style={{
                        display: 'inline-block',
                        background: 'rgba(255,255,255,0.7)',
                        color: '#222',
                        borderRadius: '999px',
                        padding: '6px 18px',
                        fontWeight: 900,
                        fontSize: 22,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                        minWidth: 60,
                      }}>
                        {card.key === 'totalSales' ? `Rs ${Math.round(stats[card.key] || 0)}` : stats[card.key]}
                      </span>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {statCards.length > 4 && (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={statCards[4].label}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 2,
                    boxShadow: 6,
                    borderRadius: 6,
                    background: cardGradients[4],
                    backdropFilter: 'blur(8px)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
                    '&:hover': {
                      boxShadow: 12,
                      transform: 'scale(1.07)',
                      borderColor: '#1976d2',
                    },
                    minHeight: 110,
                    width: 180,
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedCard(statCards[4])}
                >
                  <Avatar sx={{ bgcolor: statCards[4].color, mb: 1, width: 56, height: 56, fontSize: 32, transition: 'transform 0.3s', '&:hover': { transform: 'rotate(-12deg) scale(1.15)' } }}>
                    {statCards[4].icon}
                  </Avatar>
                  <CardContent sx={{ p: 0, textAlign: 'center' }}>
                    <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>
                      {statCards[4].label}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                      <span style={{
                        display: 'inline-block',
                        background: 'rgba(255,255,255,0.7)',
                        color: '#222',
                        borderRadius: '999px',
                        padding: '6px 18px',
                        fontWeight: 900,
                        fontSize: 22,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                        minWidth: 60,
                      }}>
                        {stats[statCards[4].key]}
                      </span>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
          <Grid container spacing={4} sx={{ mt: 8, justifyContent: 'center' }}>
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3, background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' }}>
                <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 2 }}>Sales Over Time</Typography>
                <ResponsiveContainer width="100%" height={340}>
                  <BarChart data={(stats.salesOverTime || []).map(item => ({ name: item._id, sales: item.sales }))}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a4508b" />
                        <stop offset="100%" stopColor="#5f0a87" />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tickFormatter={(date) => date} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="url(#barGradient)" radius={[10, 10, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3, background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' }}>
                <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 2 }}>Product Categories</Typography>
                <ResponsiveContainer width="100%" height={340}>
                  <PieChart>
                    <Pie data={(stats.categoryStats || []).map(item => ({ name: item._id, value: item.count }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label>
                      {(stats.categoryStats || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* Card Detail Modal */}
      {selectedCard && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0,0,0,0.4)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setSelectedCard(null)}
        >
          <Box
            sx={{
              background: '#fff',
              borderRadius: 3,
              p: 4,
              minWidth: 320,
              maxWidth: '90vw',
              boxShadow: 8,
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <Button
              onClick={() => setSelectedCard(null)}
              sx={{ position: 'absolute', top: 8, right: 8, minWidth: 0, p: 0, color: '#888' }}
            >
              ×
            </Button>
            <Typography variant="h5" fontWeight={700} mb={2}>
              {selectedCard.label} Details
            </Typography>
            {getCardDetail(selectedCard)}
          </Box>
        </Box>
      )}
    </AdminLayout>
  );
} 