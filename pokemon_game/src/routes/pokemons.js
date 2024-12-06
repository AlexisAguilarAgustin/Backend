const {Router} = require('express');
const {getAllPokemons, getPokemonById, get3RandomPokemon, createPokemon, updatePokemon, deletePokemon} = require('../controllers/pokemons');

const routes = Router();

routes.get('/', getAllPokemons);
routes.get('/:id', getPokemonById);
routes.get('/play', get3RandomPokemon);
routes.get('/', createPokemon);
routes.get('/:id', updatePokemon);
routes.get('/:id', deletePokemon);

module.exports = routes;