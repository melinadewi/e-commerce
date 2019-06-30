const { User, Product, Cart } = require('../models')

class CartController{
    static getCart(req, res, next){
        User.findOne({ _id: req.decode.id })
            .then(user => {
                if(user){
                    return Cart.findOne({
                            user: req.decode.id,
                            status: false
                        }).populate('items')
                } else {
                    throw({code: 404, message: 'User not logged in'})
                }
            })
            .then(cart => {
                res.json(cart)
            })
            .catch(next)
    }

    static getAllCart(req, res, next){
        Cart.find()
            .then(cart => {
                res.json(cart)
            })
            .catch(next)
    }

    static createCart(req, res, next){
        Cart.create({user: req.decode.id, status:false})
            .then( result => {
                res.status(201).json(result)
                console.log('Cart created')
            })
            .catch(next)
    }

    static addToCart(req, res, next){
        let searchObj
        let cartMod
        let items
        let quantity
        let inCart = false
        Cart.findOne({
            user: req.decode.id,
            status: false
        })
            .then(cart => {
                searchObj = { _id: cart._id }
                cartMod = cart
                items = cart.items
                quantity = cart.quantity
                return Product.findOne({ _id: req.body.id })
            })
            .then(product => {
                if(product){
                    for(let i = 0; i < cartMod.items.length; i++){
                        if(cartMod.items[i] == req.body.id){
                            inCart = true
                            quantity[i]++
                        }
                    }
                    if(!inCart){
                        items.push(product._id)
                        quantity.push(1)
                    }
                    const updateObj = { items, quantity }
                    const setObj = {
                        $set: updateObj
                    }
                    return Cart.updateOne(searchObj, setObj)
                } else {
                    throw({code: 404, message: 'Product not found' })
                }
            })
            .then(result => {
                console.log(result)
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Cart not found'}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }

    static reduce(req, res, next){
        let searchObj
        let cartMod
        let items
        let quantity
        let inCart = false
        Cart.findOne({
            user: req.decode.id,
            status: false
        })
            .then(cart => {
                searchObj = { _id: cart._id }
                cartMod = cart
                items = cart.items
                quantity = cart.quantity
                return Product.findOne({ _id: req.body.id })
            })
            .then(product => {
                if(product){
                    let indexDelete
                    for(let i = 0; i < cartMod.items.length; i++){
                        if(cartMod.items[i] == req.body.id){
                            inCart = true
                            quantity[i]--
                            if(quantity[i] <= 0){
                                indexDelete = i + ''
                            }
                        }
                    }
                    if(indexDelete){
                        items.splice(Number(indexDelete), 1)
                        quantity.splice(Number(indexDelete), 1)
                    }
                    if(!inCart){
                        throw {code: 404, message: 'Product not found in your cart'}
                    }
                    const updateObj = { items, quantity }
                    const setObj = {
                        $set: updateObj
                    }
                    return Cart.updateOne(searchObj, setObj)
                } else {
                    throw({code: 404, message: 'Product not found' })
                }
            })
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Cart not found'}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }

    static deleteItem(req, res, next){
        let searchObj
        let cartMod
        let items
        let quantity
        let inCart = false
        Cart.findOne({
            user: req.decode.id,
            status: false
        })
            .then(cart => {
                searchObj = { _id: cart._id }
                cartMod = cart
                items = cart.items
                quantity = cart.quantity
                return Product.findOne({ _id: req.body.id })
            })
            .then(product => {
                if(product){
                    let indexDelete
                    for(let i = 0; i < cartMod.items.length; i++){
                        if(cartMod.items[i] == req.body.id){
                            inCart = true
                            quantity[i] = 0
                            indexDelete = i + ''
                        }
                    }
                    items.splice(Number(indexDelete), 1)
                    quantity.splice(Number(indexDelete), 1)
                    if(!inCart){
                        throw {code: 404, message: 'Product not found in your cart'}
                    }
                    const updateObj = { items, quantity }
                    const setObj = {
                        $set: updateObj
                    }
                    return Cart.updateOne(searchObj, setObj)
                } else {
                    throw({code: 404, message: 'Product not found' })
                }
            })
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Cart not found'}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }

    static deleteCart(req, res, next){
        let searchObj = {
            _id: req.params.cartId
        }
        Cart.deleteOne(searchObj)
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Cart not found'}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }
}

module.exports = CartController