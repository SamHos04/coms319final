const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    name: {
        type: String,
        required: true
    },
    imageOfArt: {
        type: String
    },
    price: {
        type: Number
    }
});

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
