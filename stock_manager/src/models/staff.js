const staffQueries = {
    getAll: 'SELECT * FROM staff WHERE is_active = 1',
    getById: 'SELECT * FROM staff WHERE id = ? AND is_active = 1',
    getByemail: 'SELEC * ',
    create: 'INSERT INTO staff (name, email, password) VALUES (?,?,?)',
    update: '',
    delete: 'UPDATE staff SET IS_ACTIVE = 0 WHERE id = ?',  
};

module.exports = {staffQueries};