const router = require('express').Router()
const productController = require('../controllers/productController')
const { authentication, authorizationAdmin } = require('../middlewares/auth')
const gcsMiddlewares = require('../middlewares/gcs')

const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 1 * 1024 * 1024, // Maximum file size is 1MB
    },
});

router.get('/', productController.getAllProduct)
router.get('/:productId', productController.getProduct)
router.use(authentication)
router.use(authorizationAdmin)
router.post('/', multer.single(''), gcsMiddlewares.sendUploadToGCS, productController.addProduct)
// router.post('/', productController.addProduct)
router.patch('/:productId', productController.update)
router.delete('/:productId', productController.delete)

module.exports = router