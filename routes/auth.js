const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {User } = require('../models/user')
const bcrypt = require('bcrypt')
const Joi = require('joi')

router.post('/', async (req, res) => {

    const {error} = validate(req.body)
    if(error) return res.status(400).send("Invalid data")

    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid email or password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password')

    // Here we generate a new JSON web token. The first parameter is the payload object(just the user ID for now), the second is the private key.
    // We then return the token back to the user for use within our app.
    const token = user.generateAuthToken()
    res.send(token)
})



const validate = (req) => {
    let schema = {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
    return Joi.validate(req, schema)
}

module.exports = router