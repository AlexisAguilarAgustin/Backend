const {request, response} = require('express');
const pool = require('../db/conection');
const pokemonsModels = require('../models/pokemons');

const getAllPokemons = async (req = request, res = response) => {
let conn;
try{
    conn = await pool.getConnection();
    const pokemons = await conn.query(pokemonsModels.getAll);
    res.send(pokemons);
}catch(error){
res.status(500).send(error);
}finally{
    if(conn) conn.end();
}


};

const get3RandomPokemon = async (req = request, res = response) => {

};

const getPokemonById = async (req = request, res = response) => {

};

const createPokemon = async (req = request, res = response) => {

};

const updatePokemon = async (req = request, res = response) => {

};

const deletePokemon = async (req = request, res = response) => {

};

module.exports = {getAllPokemons, getPokemonById, get3RandomPokemon, createPokemon, updatePokemon, deletePokemon};