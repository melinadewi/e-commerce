const router = require('express').Router()
const productController = require('../controllers/productController')
const { authentication, authorizationAdmin } = require('../middlewares/auth')

console.log("Masuk ke route product")
router.get('/', productController.getAllProduct)
router.get('/:productId', productController.getProduct)
router.use(authentication)
router.use(authorizationAdmin)
router.post('/', productController.addProduct)
router.patch('/:productId', productController.update)
router.delete('/:productId', productController.delete)

module.exports = router