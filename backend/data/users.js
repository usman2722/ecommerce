const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // plain text, will be hashed by the model
        role: 'admin',
    },
];

module.exports = users; 