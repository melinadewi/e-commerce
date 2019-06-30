const router = require('express').Router()
const cartController = require('../controllers/cartController')
const { authentication, authorizationUser } = require('../middlewares/auth')

router.use(authentication, authorizationUser)
router.post('/', cartController.createCart)
router.get('/', cartController.getCart)
router.patch('/add', cartController.addToCart)
router.patch('/reduce', cartController.reduce)
router.patch('/delete', cartController.deleteItem)
router.delete('/:cartId', cartController.deleteCart)

module.exports = router