const express = require('express');
const router = express.Router();
const { getStats, getBanners, addBanner, deleteBanner } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const parser = require('../config/multer');

router.get('/stats', protect, admin, getStats);
router.get('/banners', getBanners);
router.post('/banners', protect, admin, parser.single('image'), addBanner);
router.delete('/banners/:id', protect, admin, deleteBanner);

module.exports = router; 
