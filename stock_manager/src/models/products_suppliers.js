const products_suppliersQueries = {
    getAll: 'SELECT * FROM products_suppliers WHERE is_active = 1',
    getById: 'SELECT * FROM products_suppliers WHERE id = ? AND is_active = 1',
    create: 'INSERT INTO products_suppliers (product_id, suppliers_rfc, notes) VALUES (?,?,?)',
    update: 'UPDATE products_suppliers SET product_id = ?, suppliers_rfc = ?, notes = ? WHERE id = ?',
    delete: 'UPDATE products_suppliers SET IS_ACTIVE = 0 WHERE id = ?',
};

module.exports = {products_suppliersQueries};