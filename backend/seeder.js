const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users.js');
const products = require('./data/products.js');
const User = require('./models/User.js');
const Product = require('./models/Product.js');
const Order = require('./models/Order.js');
const connectDB = require('./config/db.js');

dotenv.config();

const importData = async () => {
    try {
        await connectDB();
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        // Create test orders for the last 15 days
        const firstProduct = await Product.findOne();
        const orders = [];
        for (let i = 0; i < 15; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            orders.push({
                user: adminUser,
                orderItems: [{
                    name: firstProduct.name,
                    qty: 1,
                    image: firstProduct.image,
                    price: firstProduct.price,
                    product: firstProduct._id,
                }],
                shippingAddress: {
                    address: '123 Test St',
                    city: 'Testville',
                    postalCode: '12345',
                    country: 'Testland',
                },
                paymentMethod: 'TestPay',
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: firstProduct.price,
                isPaid: true,
                paidAt: date,
                isDelivered: true,
                deliveredAt: date,
                createdAt: date,
                updatedAt: date,
            });
        }
        await Order.insertMany(orders);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
} 