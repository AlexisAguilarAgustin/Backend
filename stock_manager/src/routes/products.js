const {Router} = require('express');
const {getAllProducts, getProductsById, createProduct, updateProduct, deleteProduct} = require('../controllers/productsc');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductsById);
router.post('/', createProduct);
router.put('/:id', updateProduct);  
router.delete('/:id', deleteProduct);

module.exports = router;