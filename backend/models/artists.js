const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mostFamousPiece: {
        type: String
    },
    countryOfOrigin: {
        type: String
    },
    otherWork: {
        type: String
    },
    imageOfPerson: {
        type: String
    }
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
