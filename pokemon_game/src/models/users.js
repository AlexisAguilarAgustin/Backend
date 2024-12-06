//const {  } = require("../routes/users");

const userQueries = {
    getAll: 'SELECT * FROM users',
    getByemail: 'SELECT * FROM users WHERE email = ?',
    addUser: 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
    getById: 'SELECT * FROM users WHERE id = ?',
    editUser: 'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?',
    emailValid: 'SELECT * FROM users WHERE email = ? AND id != ?',
    deleteUser: 'DELETE FROM users WHERE id = ?',
};

module.exports = userQueries;