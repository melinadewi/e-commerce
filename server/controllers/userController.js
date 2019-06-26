const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
    static findAll(req, res, next){
        User.find()
            .then(users => {
                res.json(users)
            })
            .catch(next)
    }

    static register(req, res, next){
        const { username, email, password } = req.body
        const input = { username, email, password }
        User.create(input)
            .then(result => {
                console.log("Result from user controller", result)
                res.status(201).json(result)
            })
            .catch(next)
    }

    static login(req, res, next){
        const { email, password } = req.body
        const input = { email, password }
        User.findOne({ email: input.email })
            .then(user => {
                if(user){
                    if(checkPassword(input.password, user.password)){
                        const payload = {
                            username: user.username,
                            email: user.email,
                            id: user._id
                        }
                        const token = generateToken(payload)
                        res.json({
                            token,
                            username: user.username
                        })
                    } else {
                        throw({code: 400, message: 'Email/Password invalid!'})
                    }
                } else {
                    throw({code: 400, message: 'Email/Password invalid!'})
                }
            })
            .catch(next)
    }
}

module.exports = UserController