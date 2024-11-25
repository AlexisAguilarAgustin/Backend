const suppliersQueries = {
    getAll: 'SELECT * FROM suppliers',
    getById: 'SELECT * FROM suppliers WHERE id = ?',
    create: 'INSERT INTO suppliers (name, email, phone_number) VALUES (?,?,?)',
    update: 'UPDATE suppliers SET name = ?, email = ?, phone_number = ? WHERE id = ?',
    delete: 'UPDATE suppliers SET IS_ACTIVE = 0 WHERE id = ?',
};

module.exports = {suppliersQueries};