const express = require('express');
const router = express.Router();
const { getBanners, addBanner, deleteBanner } = require('../controllers/adminController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Public route to get banners
router.get('/', getBanners);

// Admin routes (protected)
router.post('/', protect, admin, upload.single('image'), addBanner);
router.delete('/:id', protect, admin, deleteBanner);

module.exports = router; 