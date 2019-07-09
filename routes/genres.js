const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const {Genre, validate} = require('../models/genre')
const auth = require('../middleware/auth')
admin = require('../middleware/admin')

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres)
})

router.get('/:genre', async (req, res) => {
    try {
    const genre = await Genre.find({
        genre: req.params.genre
    })
    if(!genre) return res.status(404).send("Nothing found!")
    res.send(genre)
    }
    catch (err) {
        console.log(err.message)
    }
})

router.post('/', auth, async (req, res) => {

    const validation = validate(req.body)
    if(!validation) return res.status(400).send("Error with the request.")
    console.log(req.body)
    try {
    const genre = new Genre({
        genre: req.body.genre,
        description: req.body.description,
        niceName: req.body.niceName
    })
    const result = await genre.save()
    res.send(result)
    }
    catch(err){
        console.log(err.message)
    }
})

router.put('/:id', auth, async (req, res) => {
    const newGenre = await Genre.findByIdAndUpdate(
        req.params.id, 
        { $set: { genre: req.body.genre }}, 
        { new: true }
    )
    res.send(newGenre)
})

router.delete('/:genre', [auth, admin], async (req, res) => {
    if ( !req.params.genre) return res.status(400).send("Something is wrong with the request")

    const genre = await Genre.deleteOne({
        genre: req.params.genre
    })
    res.send(genre)
})

module.exports = router