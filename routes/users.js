const express = require('express')
const router = express.Router()
const {User, validate, validatePassword, hashPassword } = require('../models/user')
const _ = require('lodash')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/', async (req, res) => {
    const users = await User.find()
    // We don't want to send back the user's password in a GET request, so, we loop over the users array of objects
    // Then we use the lodash pick() method within the iterator to choose the objects to send.
    const filteredUsers = users.map( obj => _.pick(obj, ['userName', 'email', 'isAdmin', '_id']))
    res.send(filteredUsers)
})

router.get('/me', auth, async (req, res) => {
    // get a single user's data using JWT verify in auth.js middleware. Note that it sets req.user to the decoded info from the JWT
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send("Invalid data")
    const {pwerror} = validatePassword(req.body)
    if(pwerror) return res.status(400).send("Password too weak.")

    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('Error: Email already in use.')

    // Here we use lodash's pick() method rather than writing out req.body[property] over and over.
    user = new User(_.pick(req.body, ['userName', 'password', 'email']))
    if(!user) return res.status(400).send("Error with your request.")

    // hash the new user's password.
    user.password = await hashPassword(user.password)
    const result = await user.save()

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(result, ['userName', 'email'] ))
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user) return res.status(404).send('No user found with that ID.')
    res.send(user)
})

module.exports = router