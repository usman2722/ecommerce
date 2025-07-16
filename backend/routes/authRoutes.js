const express = require('express');
const router = express.Router();
const { registerUser, authUser, registerAdmin } = require('../controllers/authController.js');

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/admin-signup', registerAdmin);

module.exports = router; 