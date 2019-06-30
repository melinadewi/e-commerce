const { Product } = require('../models')

class ProductController{
    static getAllProduct(req, res, next){
        Product.find()
            .then(products => {
                res.json(products)
            })
            .catch(next)
    }

    static getProduct(req, res, next){
        Product.findOne({ _id: req.params.productId })
            .then(product => {
                if(!product){
                    throw {code: 404, message: 'Product not found'}
                } else {
                    res.json(product)
                }
            })
            .catch(next)
    }

    static addProduct(req, res, next){
        const { name, description, price, stock } = req.body
        const input = { name, description, price, stock }
        if(req.file){
            input.imgUrl = req.file.gcsUrl
        }
        Product.create(input)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static update(req, res, next){
        let searchObj = {
            _id: req.params.productId
        }
        let updateObj = {}
        let updateKeys = Object.keys(req.body)
        for(let i = 0; i < updateKeys.length; i++){
            updateObj[updateKeys[i]] = req.body[updateKeys[i]]
        }
        let setObj = {
            $set: updateObj
        }
        Product.updateOne(searchObj, setObj)
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Product not found'}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }

    static delete(req, res, next){
        let searchObj = {
            _id: req.params.productId
        }
        Product.deleteOne(searchObj)
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Product not found'}
                } else {
                    res.json(result)
                }
            })
            .catch(next)
    }
}

module.exports = ProductController