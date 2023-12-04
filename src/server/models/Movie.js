const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    Title: {
        type: String,
        unique: true,
        required: true,
    },
    Category: {
        type: String,
        unique: false,
        required: true,
    },
    Director: {
        type: String,
        unique: false,
        required: true,
    },
    Producer: {
        type: String,
        unique: false,
        required: true,
    },
    Cast: {
        type: String,
        unique: false,
        required: true,
    },
    Synopsis: {
        type: String,
        unique: false,
        required: true,
    },
    Reviews: {
        type: String,
        unique: false,
        //Required?
        required: false,
    },
    Trailer: {
        type: String,
        unique: false,
        required: false,
    },
    TrailerImage: {
        type: String,
        unique: false,
        required: false
    },
    Rating: {
        type: String,
        unique: false,
        //Required?
        required: false,
    },
    CurrentlyPlaying: {
        type: Boolean,
        unique: false,
        required: true,
    }
});

module.exports = Movie = mongoose.model('movie', movieSchema);