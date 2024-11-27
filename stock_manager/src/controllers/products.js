//controllers/products.js
const {request, response} = require('express');
const pool = require('../db/connection');
const {productQueries} = require('../moduls/products');



const getAllProducts = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const products = await conn.query(productQueries.getAll);
        
        //console.log(products);  // Debug: muestra los productos en la consola
        res.send(products);
    } catch (error) {
        //console.error(error);  // Debug: muestra el error completo
        res.status(500).send({ error: 'Error al obtener los productos', details: error });
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
    const {product, description, stock, measurement_unit, price, discount} = req.body;

    if (!product || !description || !stock || !measurement_unit || !price || !discount) {
        res.status(400).send('Missing required fields');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(productQueries.create, [product, description, stock, measurement_unit, price, discount]);
        if (result.affectedRows === 0) {
            res.status(500).send('Product could not be created');
            return;
        }
        res.status(201).send("Staff created succesfully");
        //res.send(result);
    } catch (error) {
        console.error(error); // Para debug
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

const updateProduct = async (req = request, res = response) => {
    const {id} = req.params;
    const {product, description, stock, measurement_unit, price, discount} = req.body;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    if (!product || !description || !stock || !measurement_unit || !price || !discount) {
        res.status(400).send('Missing required fields');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(productQueries.update, [product, description, stock, measurement_unit, price, discount, id]);
        if (result.affectedRows === 0) {
            res.status(500).send('Product could not be updated');
            return;
        }
        //res.send(result);
        res.status(200).send('Product member updated successfully');
    } catch (error) {
        console.error(error); // Para debug
        res.status(500).send(error);
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
        const result = await conn.query(productQueries.delete, [id]); // Consulta ajustada
        if (result.affectedRows === 0) {
            res.status(500).send('Product stock could not be updated to 0');
            return;
        }
        res.send({message: 'Product stock set to 0', result});
    } catch (error) {
        console.error(error); // Debug
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }
};

module.exports = {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct};