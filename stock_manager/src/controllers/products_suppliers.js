const { request, response } = require('express');
const pool = require('../db/connection');
const { productSuppliersQueries } = require('../moduls/products_suppliers');

// Obtener todos los registros
const getAllProductSuppliers = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(productSuppliersQueries.getAll);
        res.json(rows);
    } catch (error) {
        res.status(500).json(error);
    } finally {
        if (conn) conn.end();
    }
};

// Obtener un registro por ID
const getProductSupplierById = async (req = request, res = response) => {
    const { id } = req.params;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(productSuppliersQueries.getById, [id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Product-Supplier not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        res.status(500).json(error);
    } finally {
        if (conn) conn.end();
    }
};

// Crear un nuevo registro
const createProductSupplier = async (req = request, res = response) => {
    const { product_id, supplier_rfc, notes } = req.body;
    if (!product_id || !supplier_rfc || !notes) {
        res.status(400).send('All fields are required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(productSuppliersQueries.create, [product_id, supplier_rfc, notes]);
        if (result.affectedRows === 0) {
            res.status(500).send('product Suppliers could not be created');
            return;
        }
        res.status(201).send("product Suppliers created successfully");
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

// Actualizar un registro por ID
const updateProductSupplierById = async (req = request, res = response) => {
    const { id } = req.params;
    const { product_id, supplier_rfc, notes } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!product_id || !supplier_rfc || !notes) {
        res.status(400).send('All fields are required');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();

        // Verificar si el product_id existe
        const productExists = await conn.query('SELECT 1 FROM products WHERE id = ?', [product_id]);
        if (productExists.length === 0) {
            res.status(500).send('Product not found');
            return;
        }

        // Verificar si el supplier_rfc existe
        const supplierExists = await conn.query('SELECT 1 FROM suppliers WHERE rfc = ?', [supplier_rfc]);
        if (supplierExists.length === 0) {
            res.status(500).send('RFC not found');
            return;
        }

        // Realizar la actualización
        const result = await conn.query(productSuppliersQueries.updateById, [product_id, supplier_rfc, notes, id]);
        if (result.affectedRows === 0) {
            res.status(404).send('Product-Supplier not found');
        } else {
            res.send('Product-Supplier updated successfully');
        }
    } catch (error) {
        console.error('Error during update:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        if (conn) conn.end();
    }
};




// Eliminar un registro por ID
const deleteProductSupplierById = async (req = request, res = response) => {
    const { id } = req.params;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(productSuppliersQueries.deleteById, [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Product-Supplier not found' });
        } else {
            res.json({ message: 'Product-Supplier deleted successfully' });
        }
    } catch (error) {
        res.status(500).json(error);
    } finally {
        if (conn) conn.end();
    }
};

module.exports = {
    getAllProductSuppliers,
    getProductSupplierById,
    createProductSupplier,
    updateProductSupplierById,
    deleteProductSupplierById
};
