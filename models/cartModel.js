const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    quantity: [Number],
    status: Boolean
}, {timestamps: true})

const Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart