const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const parser = multer({ storage: storage });

module.exports = parser; 