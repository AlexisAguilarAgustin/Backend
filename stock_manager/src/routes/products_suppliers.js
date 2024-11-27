const { Router } = require('express');
const {
    getAllProductSuppliers,
    getProductSupplierById,
    createProductSupplier,
    updateProductSupplierById,
    deleteProductSupplierById
} = require('../controllers/products_suppliers');

const router = Router();

router.get('/', getAllProductSuppliers);
router.get('/:id', getProductSupplierById);
router.post('/', createProductSupplier);
router.put('/:id', updateProductSupplierById);
router.delete('/:id', deleteProductSupplierById);

module.exports = router;
