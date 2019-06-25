const router = require('express').Router()
const cartController = require('../controllers/cartController')

router.post('/', cartController.addCart)
router.get('/', cartController.getCart)
router.patch('/', cartController.update)

module.exports = router