const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Banner = require('../models/Banner');

// @desc    Get admin stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalBanners = await Banner.countDocuments();
    const totalSalesAgg = await Order.aggregate([
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);
    const totalSales = totalSalesAgg[0]?.total || 0;

    // Sales over time (last 30 days)
    const salesOverTime = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 29)) }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                sales: { $sum: "$totalPrice" }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    // Category stats
    const categoryStats = await Product.aggregate([
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } }
    ]);

    // Top selling products (by quantity sold, top 5)
    const topSellingProducts = await Order.aggregate([
        { $unwind: "$orderItems" },
        { $group: {
            _id: "$orderItems.product",
            name: { $first: "$orderItems.name" },
            image: { $first: "$orderItems.image" },
            totalSold: { $sum: "$orderItems.qty" }
        }},
        { $sort: { totalSold: -1 } },
        { $limit: 5 }
    ]);

    res.json({
        totalUsers,
        totalProducts,
        totalOrders,
        totalBanners,
        totalSales,
        salesOverTime,
        categoryStats,
        topSellingProducts
    });
};

// @desc    Get all banners
// @route   GET /api/admin/banners
// @access  Private/Admin
const getBanners = async (req, res) => {
  const banners = await Banner.find().sort({ createdAt: -1 });
  res.json(banners);
};

// @desc    Add a banner
// @route   POST /api/admin/banners
// @access  Private/Admin
const addBanner = async (req, res) => {
  const { title, link } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  if (!image) return res.status(400).json({ message: 'Image is required' });
  const banner = new Banner({ image, title, link });
  await banner.save();
  res.status(201).json(banner);
};

// @desc    Delete a banner
// @route   DELETE /api/admin/banners/:id
// @access  Private/Admin
const deleteBanner = async (req, res) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) return res.status(404).json({ message: 'Banner not found' });
  await Banner.deleteOne({ _id: banner._id });
  res.json({ message: 'Banner deleted' });
};

module.exports = { getStats, getBanners, addBanner, deleteBanner }; 