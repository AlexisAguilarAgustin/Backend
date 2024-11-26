const {request, response} = require('express');
const pool = require('../db/connection');
const {products_suppliersQueries} = require('../models/products_suppliers');

const getAllProducts_suppliers = async (req = request, res = response) => {
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

const getProducts_suppliersById = async (req = request, res = response) => {
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

// crear products_suppliers
const createProducts_suppliers = async (req = request, res = response) => {
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

// actualizar products_suppliers
const updateProducts_suppliers = async (req = request, res = response) => {
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

// eliminar products_suppliers
const deleteProducts_suppliers = async (req = request, res = response) => {
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

module.exports = {getAllProducts_suppliers, getProducts_suppliersById, createProducts_suppliers, updateProducts_suppliers, deleteProducts_suppliers};