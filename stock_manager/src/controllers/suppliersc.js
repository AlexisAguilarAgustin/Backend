const {request, response} = require('express');
const pool = require('../db/connection');
const {suppliersQueries} = require('../models/suppliers');

const getAllsuppliers = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const suppliers = await conn.query(suppliersQueries.getAll);
        res.send(suppliers);
    } catch (error) {
        res.status(500).send(error);  
        return;
    } finally {
        if (conn) conn.end();  
    }
};

const getSuppliersByid = async (req = request, res = response) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid RFC');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();    
        const supplier = await conn.query(suppliersQueries.getByrfc, [id]);
        if (!supplier) {
            res.status(404).send('Supplier not found');
            return;
        }
        res.send(supplier);
    } catch (error) {
        res.status(500).send(error);    
        return;
    } finally {
        if (conn) conn.end();  
    }
};

//crear supplier
const createSupplier = async (req = request, res = response) => {
    const {name, address, phone_number, email} = req.body;

    if (!name || !address || !phone_number || !email) {
        res.status(400).send("Bad request. Some fields are missing.");
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();    
        const supplier = await conn.query(suppliersQueries.create, [name, address, phone_number, email]);
        if (supplier.affectedrows === 0) {    
            res.status(500).send('Supplier could not be created');
            return;
        }
        res.send(supplier);
    } catch (error) {
        res.status(500).send(error);    
        return;
    } finally {
        if (conn) conn.end();  
    }
};

//actualizar supplier
const updateSupplier = (req = request, res = response) => {
    const { id } = req.params;
    const {name, address, phone_number, email} = req.body;

    if (!name || !address || !phone_number || !email) {
        res.status(400).send("Bad request. Some fields are missing.");
        return;
    }

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = pool.getConnection();
        const supplier = conn.query(suppliersQueries.getById, [id]);

        if (supplier.length === 0) {
            res.status(404).send('Supplier not found');
            return;
        }

        conn.query(suppliersQueries.update, [name, address, phone_number, email, id]);

        res.send(supplier);
    } catch (error) {
        res.status(500).send(error);    
        return;
    } finally {
        if (conn) conn.end();  
    }
};

//borrar supplier
const deleteSupplier = async (req = request, res = response) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const supplier = await conn.query(suppliersQueries.getById, [id]);
        if (supplier.length === 0) {
            res.status(404).send('Supplier not found');
            return;
        }

        const deletedSupplier = await conn.query(suppliersQueries.delete, [id]);

        if (deletedSupplier.affectedrows === 0) {
            res.status(500).send('Supplier could not be deleted');
            return;
        };
    } catch (error) {
        res.status(500).send(error);    
        return;
    } finally {
        if (conn) conn.end();  
    }
};

module.exports = {getAllsuppliers, getSuppliersByid, createSupplier, updateSupplier, deleteSupplier};