const { User, Product, Cart } = require('../models')

module.exports = {
    clearUser(input, done){
        User.deleteOne(input)
            .then(function(){
                console.log('User test deleted')
                done()
            })
            .catch(function(err){
                console.log(err)
                done()
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