const router = require('express').Router()
const cartController = require('../controllers/cartController')
const { authentication, authorizationUser } = require('../middlewares/auth')

router.use(authentication, authorizationUser)
router.post('/', cartController.addCart)
router.get('/', cartController.getCart)
router.patch('/', cartController.update)

module.exports = router