
const pokemonsModel = {
    getAll: 'SELECT * FROM pokemons',
    get3Random: 'SELECT * FROM pokemons ORDER BY RAND() LIMIT 3',
    getById: 'SELECT * FROM pokemons WHERE id = ?',
    getByImage: 'SELECT * FROM pokemons WHERE image = ?',
    addPokemon: 'INSERT INTO pokemons (name, image) VALUES (?,?)',
    imageValid: 'SELECT * FROM pokemons WHERE image = ? AND id <> ?', 
    editPokemon: 'UPDATE pokemons SET name = ?, image = ? WHERE id = ?',
    delete: 'DELETE FROM pokemons WHERE id = ?'

}

module.exports =pokemonsModel;