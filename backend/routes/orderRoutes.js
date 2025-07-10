const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrders,
    updateOrderToDelivered,
    deleteOrder,
} = require('../controllers/orderController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
router.route('/:id').delete(protect, admin, deleteOrder);

module.exports = router; 