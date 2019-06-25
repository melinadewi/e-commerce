const mongoose = require('mongoose');
const { hashPassword } = require('../helpers/bcrypt.js')

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: [ true, 'User must input username']
  },
  email: {
    type: String,
    required: [ true, 'Email is required!' ],
    validate: [{
        validator: function(input){
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/i.test(input);
        },
        message: props => `Email not valid!`
    }, {
        validator: function(input){
            return User.findOne({email: input})
                .then(user => {
                    if(user){
                        return false
                    }
                })
        },
        message: props => `Email has been registered!`
    }]
},
password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
        validator: function(input){
            if(input.length < 6) return false
        },
        message: props => `Password minimum 6 characters!`
    }
}
}, {timestamps: true})

userSchema.pre('save', function(next){
  this.password = hashPassword(this.password)
  next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;