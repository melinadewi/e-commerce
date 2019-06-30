const { Product } = require('../models')
const { Storage } = require('@google-cloud/storage')                    
const path = require('path')
const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
});

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
        console.log("Masuk ke add product")
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
        console.log("Masuk ke update product")
        let filename
        let searchObj = {
            _id: req.params.productId
        }
        let updateImg = false
        let updateObj = {}
        let updateKeys = Object.keys(req.body)
        for(let i = 0; i < updateKeys.length; i++){
            if(updateKeys[i] === 'file'){
                updateObj.imgUrl = req.file.gcsUrl
                updateImg = true
            } else {
                updateObj[updateKeys[i]] = req.body[updateKeys[i]]
            }
        }
        if(req.file){
            updateObj.imgUrl = req.file.gcsUrl
        }
        let setObj = {
            $set: updateObj
        }
        Product.findOne(searchObj)
            .then(product => {
                if(!product){
                    throw {code: 404, message: 'Product not found'}
                } else {
                    filename = path.basename(product.imgUrl)
                    return Product.updateOne(searchObj, setObj)
                }
            })        
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Product not found'}
                } else {
                    if(req.file){
                        storage
                            .bucket(process.env.DEFAULT_BUCKET_NAME)
                            .file(filename)
                            .delete();
                    }
                    res.json(result)
                }
            })
            .catch(next)
    }

    static delete(req, res, next){
        let searchObj = {
            _id: req.params.productId
        }
        let filename
        Product.deleteOne(searchObj)
            .then(result => {
                if(!result || result.n === 0){
                    throw {code: 404, message: 'Product not found'}
                } else {
                    console.log("Product deleted")
                    filename = path.basename(req.body.filename)
                    storage
                        .bucket(process.env.DEFAULT_BUCKET_NAME)
                        .file(filename)
                        .delete();
                    res.json(result)
                }
            })
            .catch(next)
    }
}

module.exports = ProductController