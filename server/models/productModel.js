const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product must have name'],
        validate: {
            validator: function(input){
                return Product.findOne({name: input})
                    .then(product => {
                        if(product){
                            return false
                        }
                    })
            },
            message: props => `Product has been registered!`
        }
    },
    description:  {
        type: String,
        required: [true, 'Product must have description']
    },
    imgUrl:  {
        type: String,
        required: [true, 'Product must have image']
    },
    price:  {
        type: Number,
        required: [true, 'Product must have price']
    },
    stock: {
        type: Number,
        required: [true, 'Product must have stock']
    }
}, {timestamps: true})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product