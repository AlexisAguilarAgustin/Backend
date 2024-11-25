const {request, response} = require('express');
const pool = require('../db/connection');
const {productsQueries} = require('../models/products');

const getAllProducts = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const products = await conn.query(productsQueries.getAll);
        res.send(products);
    } catch (error) {
        res.status(500).send(error);  
        return;
    } finally {
        if (conn) conn.end();  
    }
};

const getProductsById = async (req = request, res = response) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();    
        const product = await conn.query(productsQueries.getById, [id]);
        if (!product) {
            res.status(404).send('Product not found');
            return;
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);    
        return;
    } finally {
        if (conn) conn.end();  
    }
};

// crear producto
const createProduct = async (req = request, res = response) => {
    const {product,  
        description,
        stock,
        measurement_unit,
        price,
        discount} = req.body;

    if (!product, 
        !description,
        !stock,
        !measurement_unit,
        !price,
        !discount) {

        res.status(400).send('Missing required fields');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const products = await conn.query(productsQueries.create, [product, 
            description,
            stock,
             price,
             discount]);
        if (products.affectedrows === 0) {
            res.status(500).send('Product could not be created');
            return;
        }
        res.send(products);
    } catch (error) {
        res.status(500).send(error);    
        return;
    } finally {
        if (conn) conn.end();  
    }
};

// actualizar producto
const updateProduct = async (req = request, res = response) => {
    const {id} = req.params;
    const {product,  
        description,
        stock,
        price,
        discount} = req.body;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const products = await conn.query(productsQueries.update, [product,  
            description,
            stock,
            price,
            discount, 
            id]);
        if (product.affectedrows === 0) {
            res.status(500).send('Product could not be updated');
            return;
        }
        res.send(products);
    } catch (error) {
        res.status(500).send(error);    
        return;
    } finally {
        if (conn) conn.end();  
    }
};

//eliminar producto
const deleteProduct = async (req = request, res = response) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const products = await conn.query(productsQueries.delete, [id]);
        if (products.affectedrows === 0) {
            res.status(500).send('Product could not be deleted');
            return;
        }
        res.send(products);
    } catch (error) {
        res.status(500).send(error);    
        return;
    } finally {
        if (conn) conn.end();  
    }
};

module.exports = {getAllProducts, getProductsById, createProduct, updateProduct, deleteProduct};