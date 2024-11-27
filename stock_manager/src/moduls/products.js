const productQueries = {
    getAll: 'SELECT * FROM products ',
    getById: 'SELECT * FROM products WHERE id = ?',
    create: 'INSERT INTO products (product, description, stock, measurement_unit, price, discount) VALUES (?, ?, ?, ?, ?, ?)',
    update: 'UPDATE products SET product = ?, description = ?, stock = ?, measurement_unit = ?, price = ?, discount = ? WHERE id = ?',
    delete: 'UPDATE products SET stock = 0 WHERE id = ?',
};

module.exports = { productQueries };


