const { Router } = require('express');
const { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff } = require('../controllers/staff');

const router = Router();

router.get('/', getAllStaff); // Obtener todos los usuarios
router.get('/:id', getStaffById); // Obtener un usuario por ID
router.post('/', createStaff); // Crear un nuevo usuario

// Actualizar un usuario existente parcialmente
router.put('/:id', updateStaff); 

// Eliminar un usuario existente
router.delete('/:id', deleteStaff); // Eliminar un usuario

module.exports = router;