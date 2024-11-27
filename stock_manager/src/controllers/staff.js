const{request, response}=require('express');
const pool = require('../db/connection.js');
const { usersQueries, staffQueries } = require('../moduls/staff.js');


const getAllStaff= async (req=request, res=response)=>{
  let conn;
  try{
    conn = await pool.getConnection();
    const staff =await conn.query(staffQueries.getAll);
    

   // console.log({users});
    res.send(staff);
  }catch(error){
    res.status(500).send(error);
    return;
  }finally{
  if (conn) conn.end();
  }
}

const getStaffById = async (req=request, res=response)=>{
    const {id}=req.params;

    if(isNaN(id)){
        res.status(400).send('Invalid ID');
        return;
      }
    
    let conn;
    try{
        conn = await pool.getConnection();
        const staffMember  = await conn.query(staffQueries.getById, [+id]);
        if(staffMember.length === 0){
            res.status(404).send('Staff member not found');
            return;
        }
        res.send(staffMember);
        
    }catch(error){
        res.status(500).send(error);
    }finally{
        if (conn) conn.end();
    }

 

}

// Crear un nuevo usuario
const createStaff = async(req = request, res = response) => {
  const {
    first_name,
    last_name,
    birth_date,
    gender,
    phone_number,
    email,
    address,
    user_id} = req.body;

  if (
    !first_name ||
    !last_name ||
    !birth_date ||
    !gender || 
    !phone_number ||
    !email ||
    !address ||
    !user_id) {
      res.status(400).send('Bad request. Some fields are missinng.');
      return;
  }

  let conn;
  try{
    conn = await pool.getConnection();
    const staffMember= await conn.query(staffQueries.getByEmail,[email]);

    if(staffMember.length >0){
      res.status(409).send('Email alredy exists');
      return;
    }
    
    const newStaffMember = await conn.query(staffQueries.create, [
      
      first_name,
      last_name,
      birth_date ,
      gender,
      phone_number,
      email,
      address,
      user_id
    ]);

    if(newStaffMember.affectedRowns === 0){
      res.status(500).send('Staff could not be created');
      return;
    }

    
  }catch{
    res.status(500).send(error);
    return;

  }finally{
    if(conn) conn.end();
  }

};

// Actualizar un usuario en la base de datos
const updateStaff = async (req = request, res = response) => {
  const { id } = req.params;
  const {     
    first_name,
    last_name,
    birth_date,
    gender,
    phone_number,
    email,
    address,
    user_id
   } = req.body; // Asegúrate de que el campo aquí coincide con el nombre en el JSON

  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();

    // Verificar si el usuario existe
    const staffMember = await conn.query(staffQueries.getById, [+id]);
    if (staffMember.length === 0) {
      res.status(404).send('Staff member not found');
      return;
    }

    // Actualizar el nombre de usuario
    const updateStaffMember = await conn.query(staffQueries.update, [
      first_name,
      last_name,
      birth_date,
      gender,
      phone_number,
      email,
      address,
      user_id,
      +id
    ]);

    if (updateStaffMember.affectedRows === 0) {
      res.status(500).send('Staff member could not be updated');
      return;
    }

    res.status(200).send('Staff member updated successfully');
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

// Eliminar un usuario por ID
const deleteStaff = async (req = request, res = response) => {
  const {id} = req.params;

  if (isNaN(id)) {
      res.status(400).send('Invalid ID');
      return;
  }

  let conn;
  try{
    conn = await pool.getConnection();
    const staffMember = await conn.query(staffQueries.getById, [+id]);

    if(staffMember.length === 0){
      res.status(400).send('user not found');
      return
    }

    const deleteStaffMember = await conn.query(staffQueries.delete, [+id]);

    if(deleteStaffMember.affectedRows === 0){
      res.status(500).send('Staff member could not be deleted');
      return;
    }

    res.send("Staff deleted successfuly");
  }catch (error){
    res.status(500).send(error);
    return;
  } finally{
    if(conn) conn.end();
  }
  

};

module.exports = { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff };
