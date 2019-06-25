const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Required']
    },
    description:  {
        type: String,
        required: [true, 'Required']
    },
    price:  {
        type: Number,
        required: [true, 'Required']
    },
    stock: Number
}, {timestamps: true})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product