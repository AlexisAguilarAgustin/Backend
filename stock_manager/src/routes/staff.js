const {Router} = require('express');
const {getAllstaff, getStaffById, createStaff, updateStaff, deleteStaff} = require('../controllers/staffc');

const router = Router();

router.get('/', getAllstaff);
router.get('/:id', getStaffById);
router.post('/', createStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

module.exports = router;
