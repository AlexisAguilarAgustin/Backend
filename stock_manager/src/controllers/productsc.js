const {request, response} = require('express');
const pool = require('../db/connection');
const {productQueries} = require('../models/products');

const getAllProducts = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const products = await conn.query(productQueries.getAll);
        res.send(products);
    } catch (error) {
        res.status(500).send(error);  
        return;
    } finally {
        if (conn) conn.end();  
    }
};

const getProductById = async (req = request, res = response) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();    
        const product = await conn.query(productQueries.getById, [id]);
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

const createProduct = async (req = request, res = response) => {
    const {name, price, description} = req.body;

    let conn;
    try {
        conn = await pool.getConnection();
        const product = await conn.query(productQueries.create, [name, price, description]);
        if (product.affectedrows === 0) {
            res.status(500).send('Product could not be created');
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

const updateProduct = async (req = request, res = response) => {
    const {id} = req.params;
    const {name, price, description} = req.body;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const product = await conn.query(productQueries.update, [name, price, description, id]);
        if (product.affectedrows === 0) {
            res.status(500).send('Product could not be updated');
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

const deleteProduct = async (req = request, res = response) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const product = await conn.query(productQueries.delete, [id]);
        if (product.affectedrows === 0) {
            res.status(500).send('Product could not be deleted');
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

module.exports = {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};