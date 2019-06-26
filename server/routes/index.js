const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoute')
const productRoutes = require('./productRoute')
const cartRoutes = require('./cartRoute')

router.use('/user', userRoutes)
router.use('/product', productRoutes)
router.use('/cart', cartRoutes)

module.exports = router