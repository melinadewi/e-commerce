const { User, Product, Cart } = require('../models')

class CartController{
    static getCart(req, res, next){
        User.findOne({ _id: req.decode.id })
            .then(user => {
                if(user){
                    return Cart.find({
                            user: req.decode.id,
                            status: false
                        })
                } else {
                    throw({code: 404, message: 'User not logged in'})
                }
            })            
            .then(cart => {
                console.log(cart)
                if(cart.length !== 0){
                    res.json(cart)
                } else {
                    res.json('You have no items in cart')
                }
            })
            .catch(next)
    }

    static addCart(req, res, next){
        Product.findOne({ _id: req.body._id })
            .then(product => {
                if(product){    
                    const input = { 
                        user: req.decode.id,
                        items: [product],
                        quantity: [1],
                        status: false
                    }
                    return Cart.create(input)
                } else {
                    throw({code: 404, message: 'Product not found' })
                }
            })
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static update(req, res, next){
        Cart.findOne({
            user: req.decode.id,
            status: false
        })
            .then(cart => {
                if(cart){
                    let updateObj = {}
                    let updateKeys = Object.keys(req.body)
                    for(let i = 0; i < updateKeys.length; i++){
                        updateObj[updateKeys[i]] = req.body[updateKeys[i]]
                    }
                    let setObj = {
                        $set: updateObj
                    }
                    return Cart.updateOne(cart, setObj)
                } else {
                    throw({code: 401, message: 'Cart not found' })
                }
            })
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 401, message: 'Cart not found'}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }
}

module.exports = CartController