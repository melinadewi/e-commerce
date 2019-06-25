const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/create', userController.register)
router.post('/login', userController.login)
router.get('/get', userController.findAll)

module.exports = router