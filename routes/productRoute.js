const router = require('express').Router()
const productController = require('../controllers/productController')

router.post('/', productController.addProduct)
router.get('/', productController.getAllProduct)
router.get('/:productId', productController.getProduct)
router.patch('/:productId', productController.update)
router.delete('/:productId', productController.delete)

module.exports = router