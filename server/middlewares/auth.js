const ModelName = require('../models').ModelName
const { verifyToken } = require('../helpers/jwt')

module.exports = {
    authentication (req, res, next){
        if(req.headers.hasOwnProperty('token')){
            try{
                const decode = verifyToken(req.headers.token)
                req.decode = decode
                next()
            } catch(err){
                err.status = 400
                res.json({
                    message: 'Unverified token'
                })
            }
        } else {
            next({status: 400})
            res.json({
                message: 'Token not found'
            })
        }
    },
    authorizationAdmin(req, res, next){
        if('admin' === req.decode.username){
            next()
        } else {
            throw {code: 401, message: 'User not authorized'}
        }
    },
    authorizationUser(req, res, next){
        console.log("AUTHORIZATION USER");       
        if(req.decode.username && req.decode.username !== 'admin'){
            next()
        } else {
            throw {code: 401, message: 'User not authorized'}
        }
    }    
}