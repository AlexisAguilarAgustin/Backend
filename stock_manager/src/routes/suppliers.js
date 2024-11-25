const {Router} = require('express');
const {getAllsuppliers, getSuppliersById, createSupplier, updateSupplier, deleteSupplier} = require('../controllers/suppliersc');

const router = Router();

router.get('/', getAllsuppliers);
router.get('/:id', getSuppliersById);
router.post('/', createSupplier);
router.put('/:id', updateSupplier);  
router.delete('/:id', deleteSupplier);

module.exports = router;