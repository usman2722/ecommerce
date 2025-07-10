const express = require('express');
const router = express.Router();
const { getStats, getBanners, addBanner, deleteBanner } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
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

router.get('/stats', protect, admin, getStats);
router.get('/banners', getBanners);
router.post('/banners', protect, admin, upload.single('image'), addBanner);
router.delete('/banners/:id', protect, admin, deleteBanner);

module.exports = router; 
