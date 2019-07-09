const mongoose = require('mongoose')

// Here we set a custom schema for MongoDB when interacting with the Genre data.        
const filmSchema = new mongoose.Schema({
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    niceName: {
        type: String
    },
    description: {
        type: String,
        required: true
    }
})

// link the schema to a Mongoose Model. Note the upper case: this is a CLASS, not an object.
const Film = mongoose.model("Film", filmSchema);

const validateFilm = (film) => {
    let schema = {
        niceName: Joi.string(),
        name: Joi.string().required(),
        description: Joi.string().required()
    }
    return Joi.validate(film, schema)
}

exports.Film = Film
exports.validate = validateFilm