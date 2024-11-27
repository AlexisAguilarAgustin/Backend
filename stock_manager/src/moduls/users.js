const usersQueries = {
    getAll: 'SELECT * FROM users WHERE is_active = 1',
    getUserById: 'SELECT * FROM users WHERE id = ? AND is_active = 1',
    getUsername: 'SELECT * FROM users WHERE username =?',
    create: 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)', 
    updateUserName: 'UPDATE users SET username = ? WHERE id = ?',
    delete: "UPDATE users SET is_active = 0 WHERE id = ?",
    
};

module.exports = { usersQueries };
