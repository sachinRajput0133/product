const { Router } = require('express');
const productController = require('../controllers/productController');
const { validate, productSchema, updateProductSchema } = require('../middlewares/validate');

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', validate(productSchema), productController.createProduct);
router.put('/:id', validate(updateProductSchema), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
