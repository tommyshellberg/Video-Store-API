const mongoose = require('mongoose')
const Joi = require('joi')

// Here we set a custom schema for MongoDB when interacting with the Genre data.        
const genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        lowercase: true,
        required: true
    },
    niceName: String,
    description: {
        type: String,
        required: true
    }
})

// link the schema to a Mongoose Model. Note the upper case: this is a CLASS, not an object.
const Genre = mongoose.model("Genre", genreSchema);

const validateGenre = (genre) => {
    let schema = {
        genre: Joi.string().required(),
        niceName: Joi.string().required(),
        description: Joi.string().required()
    }
    return Joi.validate(genre, schema)
}

exports.Genre = Genre
exports.validate = validateGenre