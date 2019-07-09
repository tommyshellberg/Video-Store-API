const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const { Film, validate } = require('../models/film')
const {Genre} = require('../models/genre')
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
    const films = await Film
    .find()
    .populate('genre', 'niceName -_id')
    .select('name description genre -_id')
    res.send(films)
})

router.delete('/:id', auth, async (req, res) => {
    if ( !req.params || !req.params.id ) return res.status(400).send("Something is wrong with the request")
    const film = await Film.findByIdAndDelete(req.params.id )
    if (!film) return res.status(404).send('Film not found')
    res.send(film)
})

router.post('/', auth, async (req, res) => {
    if ( !req.body ) return res.status(400).send("Something is wrong with the request")
    const film = new Film({
        genre: req.body.genre,
        name: req.body.name,
        niceName: req.body.niceName,
        description: req.body.description
    })
    const result = await film.save()
    res.send(result)
})

module.exports = router