const {request, response} = require('express');
const pool = require('../db/connection');
const {staffQueries} = require('../models/staff');

const getAllstaff = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const staff = await conn.query(staffQueries.getAll);
        res.send(staff);
    } catch (error) {

        res.status(500).send(error);  
        return;
    } finally {
        if (conn) conn.end();  
    }
};

const getStaffById = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {    
        res.status(400).send( 'Invalid ID' );
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const staff = await conn.query(staffQueries.getById, [id]);
        if (!staff) {
            res.status(404).send('Staff not found' );
            return;
        }
        res.send(staff);
    } catch (error) {
        res.status(500).send(error);    
        return;
    } finally {
        if (conn) conn.end();  
    }
};

//crear nuevo staff
const createStaff = async (req = request, res = response) => {
    const {first_name,
        last_name,
        birth_name,
        gender,
        phone_number,
        email,
        address, 
         user_id} = req.body;

    if (!first_name,
        !last_name,
        !birth_name,
        !gender,
        !phone_number,
        !email,
        !address, 
        !user_id) {
        res.status(400).send("Bad request. Some fields are missing.");
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const staff = conn.query(staffQueries.getByEmail, [email]);

        if (staff.length > 0) {
            res.status(409).send('Email already exists');
            return;
        }
        const newStaff = await conn.query(staffQueries.create, 
           [first_name,
            last_name,
            birth_name,
            gender,
            phone_number,
            email,
            address, 
            user_id]);

        if (newStaff.affectedrows === 0) {
            res.status(500).send('Staff could not be created');
            return;
        }

        console.log(newStaff);
        res.status(201).send("Staff create satisfaction")    
    } catch (error) {
      res.status(500).send(error);  
      return;
    } finally {
      if (conn) conn.end();  
    }
};

//editar staff
const updateStaff = (req = request, res = response) => {
    const { id } = req.params;
    const {first_name,
        last_name,
        birth_name,
        gender,
        phone_number,
        email,
        address, 
        user_id } = req.body;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID' );
        return;
    }

    let conn;
    try {
        conn = pool.getConnection();
        const staff = conn.query(staffQueries.getById, [id]);

        if (!staff) {
            res.status(404).send('Staff not found');
            return;
        }
        conn.query(staffQueries.update,
           [first_name,
            last_name,
            birth_name,
            gender,
            phone_number,
            email,
            address, 
            user_id, 
            id]);
        res.status(200).send('Staff updated successfully');
    } catch (error) {
        res.status(500).send(error);
        return;
    } finally {
        if (conn) conn.end();  
    }
};

//borrar staff
const deleteStaff = async (req = request, res = response) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const staff = await conn.query(staffQueries.getById, [id]);

        if (staff.length === 0) {
            res.status(404).send('Staff not found');
            return;
        }

        const deletedStaff = await conn.query(staffQueries.delete, [id]);

        if (deletedStaff.affectedrows === 0) {
            res.status(500).send('Staff could not be deleted');
            return;
        };
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();  
    }
};

module.exports = {getAllstaff, getStaffById, createStaff, updateStaff, deleteStaff};