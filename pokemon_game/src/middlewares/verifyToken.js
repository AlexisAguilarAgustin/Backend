const {request, response} = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const verifyToken =  (req, res, next) => {
 const header =  req.header("Authorization") || "";
 const token = header.split(" ")[1];

 if (!token){
    return res.status(401).send({message: "Token not provided"});
 }

try{
const playload = jwt.verify(token, secret);
req.id = playload.id;
req.is_admin = playload.is_admin;
next();
}catch (error){
    return res.status(403).send({message: "Token not valid"})
}
}

module.exports = verifyToken;