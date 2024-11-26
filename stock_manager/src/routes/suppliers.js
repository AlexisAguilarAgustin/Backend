const {Router} = require('express');
const {getAllsuppliers, getSuppliersByid, createSupplier, updateSupplier, deleteSupplier} = require('../controllers/suppliersc');

const router = Router();

router.get('/', getAllsuppliers);
router.get('/:id', getSuppliersByid);
router.post('/', createSupplier);
router.put('/:id', updateSupplier);  
router.delete('/:id', deleteSupplier);

module.exports = router;