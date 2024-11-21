const { request, response } = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/connection');
const {usersQueries} = require('../models/users');

const saltRounds = 10;

//const users = [
//    { id: 1, name: 'John' },
//    { id: 2, name: 'Jane' },
//    { id: 3, name: 'Peter' },
//];

const getAllusers = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const users = await conn.query('usersQueries.getAll');

        res.send(users);
    } catch (error) {
      res.status(500).send(error);  
      return;
    } finally {
      if (conn) conn.end();  
    }

};

const getUsersById = async (req = request, res = response) => {
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).send( 'Invalid ID');
        return;
    }
    let conn;
    try {
        conn = await pool.getConnection();
    const user = await conn.query(usersQueries.getUsersById, [id]); 
    if (!user) {
        res.status(404).send({ msg: 'User not found' });
        return;
    }
    res.send(user);
   
    } catch (error) {
      res.status(500).send(error);  
    } finally {
      if (conn) conn.end();  
    }   
    
};

// Crear nuevo usuario
const createUser = async (req = request, res = response) => {
    const {username, password, email} = req.body;

    if (!username, !password, !email) {
        res.status(400).send("Bad request. Some fields are missing.");
        return;
    }


    let conn;
    try {
        conn = await pool.getConnection();
        const user = conn.query(usersQueries.getByUsername, [username]);

        if (user.length > 0) {
            res.status(409).send('Username already exists')
            return;
        }

        const hastPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await conn.query(usersQueries.create, [username, hastPassword, email]);
    
        if (newUser.affectedrows === 0) {
            res.status(500).send('User could not be created');
            return;
        }

    console.log(newUser);
    res.status(201).send("User create satisfaction")    
    } catch (error) {
      res.status(500).send(error);
      return;
    } finally {
        if (conn) conn.end();
    }
};

const loginUser = async (req = request, res = response) => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).send("username and password are required");
        return;
    }

    try {
        conn = await pool.getConnection();
        const user = await conn.query(usersQueries.getByUsername, [username]);

        if (user.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user[0].password);

        if (!passwordMatch) {
            res.status(403).send('Bad usernaeme or password');
            return;
        }
    }catch (error) {
        res.status(500).send(error);
    }finally {
        if (conn) conn.end();
    }
}

// Editar usuario
const updateUser = async (req = request, res = response) => {
    const { id } = req.params;
    const { name } = req.body;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const user = await conn.query(usersQueries.getById, [+id]);

        

        if (user.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        const updatedUser = await conn.query(usersQueries.update, [name, id]);

        if (updatedUser.affectedrows === 0) {
            res.status(500).send('User could not be updated');
            return;
        };

    } catch (error) {
        res.status(500).send(error);
        return;
    } finally {
        if (conn) conn.end();
    }
};

// Borrar usuario
const deleteUser = async (req = request, res = response) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return;
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const user = await conn.query(usersQueries.getById, [+id]);

        if (user.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        const deletedUser = await conn.query(usersQueries.delete, [id]);

        if (deletedUser.affectedrows === 0) {
            res.status(500).send('User could not be deleted');
            return;
        };
    } catch (error) {
        res.status(500).send(error);
    } finally {
        if (conn) conn.end();
    }  
    

        
};

module.exports = { getAllusers, getUsersById, loginUser, createUser, updateUser, deleteUser };