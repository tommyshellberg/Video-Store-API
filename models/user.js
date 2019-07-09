const mongoose = require('mongoose')
const Joi = require('joi')
const PasswordComplexity = require('joi-password-complexity')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    userName: {
        minlength: 5,
        type: String,
        maxlength: 15,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
        match: /.*@.*/
    },
    password: {
        type: String,
        required: true
    }
})

// We are creating a custom method for the generated user object here. This is later used in auth.js for retrieving a JWT token.
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey') )
}

const User = mongoose.model('User', userSchema)

const validateUser = (user) => {
    let schema = {
        userName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }
    return Joi.validate(user, schema)
}

const validatePassword = (user) => {
    return Joi.validate(user.password, new PasswordComplexity())
}

const hashPassword = (password) => {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
}


module.exports.User = User
module.exports.validate = validateUser
module.exports.validatePassword = validatePassword
module.exports.hashPassword = hashPassword