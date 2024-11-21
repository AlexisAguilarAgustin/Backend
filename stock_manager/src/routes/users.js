const {Router} = require('express');
const {getAllusers, getUsersById, createUser, loginUser, updateUser, deleteUser} = require('../controllers/usersc');



const router = Router();

router.get('/', getAllusers);
router.get('/:id', getUsersById);
router.post('/', createUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;