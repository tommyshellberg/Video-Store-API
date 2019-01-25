const express = require('express')
const Joi = require('joi')
const _ = require('underscore')

const app = express()
app.use(express.json())

const data = require('./data.json')
console.log(data)

const validateGenre = (genre) => {
    let schema = {
        genre: Joi.string().required(),
        niceName: Joi.string().required(),
        description: Joi.string().required()
    }
    return Joi.validate(genre, schema)
}

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.get('/api/genres', (req, res) => {
    res.send(data.genres)
})

app.get('/api/genres/:genre', (req, res) => {
    const genre = data.genres.find( g => g.genre == req.params.genre )
    if ( !genre ) return res.status(404).send("Sorry, not found")
    res.send(genre)
})

app.post('/api/genres', (req, res) => {
    const result = validateGenre(req.body)
    if(req.error) return res.status(400).send("Error with the request.")
    const genre = req.body
    data.genres.push(genre)
    res.send(data.genres)
})

app.delete('/api/genres/:genre', (req, res) => {
    if ( !req.params.genre) return res.status(400).send("Something is wrong with the request")
    const genre = data.genres.find( g => g.genre == req.params.genre )
    if( !genre ) return res.status(404).send("No genre found!")
    data.genres.splice((data.genres.indexOf(genre)), 1)
    res.send(genre)
})

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`listening on port ${port}`)})