const products_suppliersQueries = {
    getAll: 'SELECT * FROM products WHERE is_active = 1',
    getById: 'SELECT * FROM products WHERE id = ? AND is_active = 1',
    create: 'INSERT INTO products (name, price, description) VALUES (?,?,?)',
    update: 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
    delete: 'UPDATE products SET IS_ACTIVE = 0 WHERE id = ?',
};

module.exports = {products_suppliersQueries};