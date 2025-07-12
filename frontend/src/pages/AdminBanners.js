import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Snackbar, Alert, Link as MuiLink
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AdminLayout from '../components/AdminLayout';
import API from '../services/api';
import { getImageUrl } from '../utils/imageUtils';

const API_URL = '/admin/banners';

export default function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: '', link: '', image: null });
  const [message, setMessage] = useState({ open: false, text: '', severity: 'success' });

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(API_URL);
      setBanners(data);
    } catch (err) {
      setMessage({ open: true, text: 'Failed to load banners', severity: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.image) {
      setMessage({ open: true, text: 'Please select an image', severity: 'warning' });
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('image', form.image);
    formData.append('title', form.title);
    formData.append('link', form.link);
    try {
      await API.post(API_URL, formData);
      setMessage({ open: true, text: 'Banner added successfully', severity: 'success' });
      setForm({ title: '', link: '', image: null });
      fetchBanners();
    } catch (err) {
      setMessage({ open: true, text: 'Failed to add banner', severity: 'error' });
    }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this banner?')) return;
    try {
      await API.delete(`${API_URL}/${id}`);
      setMessage({ open: true, text: 'Banner deleted', severity: 'success' });
      fetchBanners();
    } catch (err) {
      setMessage({ open: true, text: 'Failed to delete banner', severity: 'error' });
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 2 }}>
        <Typography
          variant="h4"
          fontWeight={900}
          mb={3}
          textAlign="center"
          sx={{
            color: '#1d4ed8', // blue-700
            textShadow: '0 2px 8px rgba(29,78,216,0.08)',
            lineHeight: 1.2,
            display: 'inline-block',
          }}
        >
          Manage Banners
        </Typography>
        <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', boxShadow: 3, borderRadius: 4 }}>
          <Typography variant="h6" fontWeight={600} mb={2} sx={{ background: 'linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>Add New Banner</Typography>
          <form onSubmit={handleUpload} style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ minWidth: 180 }}
              color={form.image ? 'success' : 'primary'}
            >
              {form.image ? 'Image Selected' : 'Select Image'}
              <input type="file" name="image" accept="image/*" hidden onChange={handleChange} />
            </Button>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              size="small"
              sx={{ minWidth: 180 }}
            />
            <TextField
              label="Link (optional)"
              name="link"
              value={form.link}
              onChange={handleChange}
              size="small"
              sx={{ minWidth: 220 }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={uploading}
              sx={{
                minWidth: 120,
                background: 'linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%)',
                color: '#fff',
                fontWeight: 700,
                borderRadius: 999,
                boxShadow: 3,
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)',
                },
              }}
            >
              {uploading ? <CircularProgress size={24} /> : 'Add Banner'}
            </Button>
          </form>
        </Paper>
        <Paper sx={{ p: 2, background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', boxShadow: 3, borderRadius: 4 }}>
          <Typography variant="h6" fontWeight={600} mb={2} sx={{ background: 'linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', display: 'inline-block' }}>Current Banners</Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
          ) : banners.length === 0 ? (
            <Typography color="text.secondary">No banners found.</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Link</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {banners.map((banner) => (
                    <TableRow key={banner._id}>
                      <TableCell>
                        <img src={getImageUrl(banner.image)} alt={banner.title} style={{ width: 120, height: 60, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px #0001' }} />
                      </TableCell>
                      <TableCell>{banner.title || '-'}</TableCell>
                      <TableCell>
                        {banner.link ? (
                          <MuiLink href={banner.link} target="_blank" rel="noopener" underline="hover">{banner.link}</MuiLink>
                        ) : '-'}
                      </TableCell>
                      <TableCell>{new Date(banner.createdAt).toLocaleString()}</TableCell>
                      <TableCell align="right">
                        <IconButton color="error" onClick={() => handleDelete(banner._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
        <Snackbar
          open={message.open}
          autoHideDuration={3000}
          onClose={() => setMessage({ ...message, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={message.severity} sx={{ width: '100%' }}>{message.text}</Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
} 