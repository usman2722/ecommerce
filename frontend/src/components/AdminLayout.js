import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ImageIcon from '@mui/icons-material/Image';
import PublicIcon from '@mui/icons-material/Public';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 220;

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
  { label: 'Products', path: '/admin/products', icon: <InventoryIcon /> },
  { label: 'Orders', path: '/admin/orders', icon: <ShoppingCartIcon /> },
  { label: 'Banners', path: '/admin/banners', icon: <ImageIcon /> },
  { label: 'Visit Website', path: '/', icon: <PublicIcon />, external: true },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    // Set global background for admin pages
    document.body.style.background = '#f4f6f8';
    document.body.style.minHeight = '100vh';
    document.documentElement.style.background = '#f4f6f8';
    document.documentElement.style.minHeight = '100vh';
    return () => {
      document.body.style.background = '';
      document.body.style.minHeight = '';
      document.documentElement.style.background = '';
      document.documentElement.style.minHeight = '';
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  // Close drawer on navigation (mobile)
  useEffect(() => {
    if (isMobile) setMobileOpen(false);
    // eslint-disable-next-line
  }, [location.pathname]);

  const drawerContent = (
    <Box sx={{ px: 2, py: 3, textAlign: 'center', borderBottom: '1px solid #2d313a', mb: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, color: '#fff', fontFamily: 'Roboto, sans-serif' }}>
        Admin Panel
      </Typography>
      <Box sx={{ overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.label}
              component={item.external ? 'a' : Link}
              to={item.external ? undefined : item.path}
              href={item.external ? item.path : undefined}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener' : undefined}
              selected={!item.external && location.pathname === item.path}
              sx={{
                my: 0.5,
                borderRadius: 2,
                mx: 1,
                color: item.external ? '#90caf9' : '#fff',
                fontWeight: item.external ? 600 : undefined,
                '& .MuiListItemIcon-root': { color: item.external ? '#90caf9' : '#fff' },
                transition: 'background 0.2s, transform 0.2s, color 0.2s',
                ...(location.pathname === item.path && !item.external && {
                  bgcolor: 'primary.main',
                  color: '#fff',
                  boxShadow: 2,
                  transform: 'scale(1.04)',
                  '& .MuiListItemIcon-root': { color: '#fff' },
                }),
                '&:hover': {
                  bgcolor: item.external ? 'primary.light' : 'primary.dark',
                  color: '#fff',
                  transform: 'scale(1.03)',
                  '& .MuiListItemIcon-root': { color: '#fff' },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
        <List>
          <ListItem
            button
            key="Logout"
            onClick={handleLogout}
            sx={{
              my: 1,
              borderRadius: 2,
              mx: 1,
              color: '#f44336',
              fontWeight: 600,
              '& .MuiListItemIcon-root': { color: '#f44336' },
              transition: 'background 0.2s, color 0.2s',
              '&:hover': {
                bgcolor: 'error.main',
                color: '#fff',
                '& .MuiListItemIcon-root': { color: '#fff' },
              },
            }}
          >
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar with hamburger for mobile */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#23272f' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2 }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      {/* Responsive Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#23272f',
            color: '#fff',
            borderRight: 0,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f4f6f8', minHeight: '100vh', p: 0 }}>
        {/* Add top margin for AppBar on mobile */}
        {isMobile && <Toolbar />}
        {children}
      </Box>
    </Box>
  );
} 