const productSuppliersQueries = {
    getAll: 'SELECT * FROM products_suppliers',
    getById: 'SELECT * FROM products_suppliers WHERE id = ?',
    create: 'INSERT INTO products_suppliers (product_id, supplier_rfc, notes) VALUES (?, ?, ?)',
    updateById: 'UPDATE products_suppliers SET product_id = ?, supplier_rfc = ?, notes = ? WHERE id = ?',
    deleteById: 'DELETE FROM products_suppliers WHERE id = ?'
};

module.exports = { productSuppliersQueries };
