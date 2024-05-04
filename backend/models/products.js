const mongoose = require('mongoose');
const artworkSchema = new mongoose.Schema({
    name: String,
    artist: String,
    price: Number,
    imageOfArt: String
  });
const artistSchema = new mongoose.Schema({
    name: String,
    mostFamousPiece: String,
    countryOfOrigin: String,
    otherWork: String,
    imageOfPerson: String
  });
const finalDataSchema = new mongoose.Schema({
    artists: [artistSchema],
    artwork: [artworkSchema]
  });
const FinalData = mongoose.model('FinalData', finalDataSchema);
module.exports = FinalData;