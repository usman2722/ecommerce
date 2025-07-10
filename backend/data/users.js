const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('password123', 10),
        role: 'admin',
    },
];

module.exports = users; 