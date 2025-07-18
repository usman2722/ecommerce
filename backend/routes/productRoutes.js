const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');
const parser = require('../config/multer');

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
    .route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

router.post('/upload', protect, admin, parser.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Cloudinary URL is in req.file.path
  res.status(201).json({ image: req.file.path });
});

module.exports = router; 