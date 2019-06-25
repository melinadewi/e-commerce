const { User, Product, Cart } = require('../models')

module.exports = {
    clearUser(input){
        User.deleteOne(input)
            .then(function(){
                console.log('User test deleted')
            })
            .catch(function(err){
                console.log(err)
            })
    },

    clearProduct(input){
        Product.deleteOne(input)
            .then(function(){
                console.log('Product test deleted')
            })
            .catch(function(err){
                console.log(err)
            })
    },

    clearCart(input){
        Cart.deleteOne(input)
            .then(function(){
                console.log('Cart test deleted')
            })
            .catch(function(err){
                console.log(err)
            })
    },
}