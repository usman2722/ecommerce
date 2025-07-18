const express = require('express');
const router = express.Router();
const { getBanners, addBanner, deleteBanner } = require('../controllers/adminController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');
const parser = require('../config/multer');
const path = require('path');

// Public route to get banners
router.get('/', getBanners);

// Admin routes (protected)
router.post('/', protect, admin, parser.single('image'), addBanner);
router.delete('/:id', protect, admin, deleteBanner);

module.exports = router; 