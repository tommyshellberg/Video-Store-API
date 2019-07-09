//Create a new Mongoose instance and catch any errors.
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
        .then( () => console.log('connected to mongodb...'))
        .catch( error => console.error(error.message))

const express = require('express')
const _ = require('underscore')

const config = require('config')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const films = require('./routes/films')
const users = require('./routes/users')
const auth = require('./routes/auth')
const home = require('./routes/home')

// Declare app
const app = express()

// Set config
const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`listening on port ${port}`)})

// Check for the private key for JSON web tokens, crash the app if it's missing
if (!config.get('jwtPrivateKey')) {
        console.error('the JWT private key is not defined!')
        process.exit(1)
}

//Middleware
app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/films', films)
app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/', home)