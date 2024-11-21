const usersQueries = {
    getAll: 'SELECT * FROM users WHERE is_active = 1',
    getById: 'SELECT * FROM users WHERE id = ? AND is_active = 1',
    getByUsername: 'SELECT * FROM users WHERE username = ?',
    create: 'INSERT INTO users (username, password, email) VALUES (?,?,?)',
    delete: 'UPDATE users SET IS_ACTIVE = 0 WHERE id = ?',
};

module.exports = {usersQueries};