const {request, response} = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/conection');
const userQueries = require('../models/users');

const SALT_ROUNDS = 10;

const getAllUsers = async (req = request, res = response) => {
    let conn;

try {
conn = await pool.getConnection();
const users = await conn.query(userQueries.getAll);

res.send(users);
return;
} catch (error) {
  res.status(500).send( error);  
  return;
} finally {
 if (conn) conn.end();   
}

};

//crear usiario 
const createUser = async (req = request, res = response) => {
  const {first_name, 
    last_name,
    email,
    password} = req.body;

    if (!first_name || !last_name || !email || !password) {
        res.status(400).send({msg: 'Missing required fields'});
        return;
    }

    let conn;

    try {
        conn = await pool.getConnection();
        const user_exists = await conn.query(userQueries.getByEmail, [email]);

        if (user_exists.length > 0) {
            res.status(409).send({msg: 'User already exists'});
            return;
        }

        const hasheadPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await conn.query(userQueries.addUser, [first_name, last_name, email, hasheadPassword]);

        if (newUser.affectedRows === 0) {
            res.status(500).send('error adding user');
            return;
        }

        res.status(201).send({msg: 'User created successfully'});
    } catch (err) {
      res.status(500).send({msg: 'Internal server error'});
      return;  
    }finally {
        if (conn) conn.end();
    }
};

const getUser = async (req = request, res = response) => {
  const {id} = req.params;

  if (isNaN(id)) {
    res.status(400).send({msg: 'Invalid ID'});
    return;
  }
 
  let conn;
  try {
    conn = await pool.getConnection();
    const [user] = await conn.query(userQueries.getById, [id]);

    if (user.length === 0) {
      res.status(404).send({msg: 'User not found'});
      return;
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({msg: 'Internal server error'});
    return;
  } finally {
    if (conn) conn.end();
  }
};

//actualizar usuario
const updateUser = async (req = request, res = response) => {
  const {id} = req.params;
  const {first_name, 
    last_name, 
    email} = req.body;

  if (isNaN(id)) {
    res.status(400).send({msg: 'Invalid ID'});
    return;
  }

  if (!first_name || !last_name || !email) {
    res.status(400).send({msg: 'Missing required fields'});
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const [user] = await conn.query(userQueries.getById, [id]);

    if (user.length === 0) {
      res.status(404).send({msg: 'User not found'});
      return;
    }

    const [emailExists] = await conn.query(userQueries.getByEmail, [email]);

    if (emailExists) {
      res.status(409).send({msg: 'Email already exists'});
      return;
    }

    const updatedUser = await conn.query(userQueries.updateUser, [first_name, last_name, email, id]);

    if (updatedUser.affectedRows === 0) {
      res.status(500).send({msg: 'user not updating'});
      return;
    }

    res.status(200).send({msg: 'User updated'});
  }catch (err) {
    res.status(500).send({msg: 'Internal server error'});
    return;
  }finally {
    if (conn) conn.end();
  }

};
// eliminar usuario
const destroyUser = async (req = request, res = response) => {
  const {id} = req.params;

  if (isNaN(id)) {
    res.status(400).send({msg: 'Invalid ID'});
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const [user] = await conn.query(userQueries.getById, [id]);
    if (!user) {
      res.status(404).send({msg: 'User not found'});
      return;
    }

    const deletedUser = await conn.query(userQueries.deleteUser, [id]);
    if (deletedUser.affectedRows === 0) {
      res.status(500).send({msg: 'user not deleting'});
      return;
    }
  }catch (err) {
   res.status(500).send({msg: 'Internal server error'});
  }finally {
    if (conn) conn.end();
  }
};

module.exports = {getAllUsers, createUser, getUser, updateUser, destroyUser};