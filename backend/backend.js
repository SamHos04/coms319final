const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');


const app = express();
const port = 8081;
const host = 'localhost';

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/finalData', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

const artistSchema = new mongoose.Schema({
    id: Number,
    name: String,
    mostFamousPiece: String,
    countryOfOrigin: String,
    otherWork: String,
    imageOfPerson: String,
}, {collection: 'Artists'});

const artworkSchema = new mongoose.Schema({
    artist: String,
    id: Number,
    imageOfArt: String,
    name: String,
    price: Number
}, { collection: 'Artwork'});

const Artist = mongoose.model('Artists', artistSchema);
const Artwork = mongoose.model('Artwork', artworkSchema);

// Create a new artist
app.post('/artists', async (req, res) => {
    const newArtist = new Artist(req.body);
    try {
        const savedArtist = await newArtist.save();
        console.log('Artist saved:', savedArtist); // Log saved artist
        res.status(201).json(savedArtist);
    } catch (error) {
        console.error('Error saving artist:', error);
        res.status(400).json({ message: 'Error saving artist', error });
    }
});

// Get all artists
app.get('/listArtists', async (req, res) => {
    try {
      const artists = await Artist.find({});
      console.log()
      const artistData = artists.map(artist => ({
        ...artist.toJSON()
      }));
      res.json(artistData);
    } catch (error) {
      console.error('Error fetching artists:', error);
      res.status(200).json({ message: 'Error fetching artists', error });
    }
  });

// Update an artist by ID
app.put('/artists/:id', async (req, res) => {
    try {
        const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log('Updated artist:', updatedArtist); // Log updated artist
        res.json(updatedArtist);
    } catch (error) {
        console.error('Error updating artist:', error);
        res.status(500).json({ message: 'Error updating artist', error });
    }
});

// Delete an artist by ID
app.delete('/artists/:id', async (req, res) => {
    try {
        const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
        console.log('Deleted artist:', deletedArtist); // Log deleted artist
        res.json({ message: 'Artist deleted', deletedArtist });
    } catch (error) {
        console.error('Error deleting artist:', error);
        res.status(500).json({ message: 'Error deleting artist', error });
    }
});

// Create a new artwork
app.post('/artwork', async (req, res) => {
    const newArtwork = new Artwork(req.body);
    try {
        const savedArtwork = await newArtwork.save();
        console.log('Artwork saved:', savedArtwork); // Log saved artwork
        res.status(201).json(savedArtwork);
    } catch (error) {
        console.error('Error saving artwork:', error);
        res.status(400).json({ message: 'Error saving artwork', error });
    }
});

// Get all artwork
app.get('/listArtwork', async (req, res) => {
    try {
      const artwork = await Artwork.find();
      const artworkData = artwork.map(art => ({
        ...art.toJSON()
      }));
      res.json(artworkData);
    } catch (error) {
      console.error('Error fetching artwork:', error);
      res.status(500).json({ message: 'Error fetching artwork', error });
    }
  });

// Update artwork by ID
app.put('/artwork/:id', async (req, res) => {
    try {
        const updatedArtwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log('Updated artwork:', updatedArtwork); // Log updated artwork
        res.json(updatedArtwork);
    } catch (error) {
        console.error('Error updating artwork:', error);
        res.status(500).json({ message: 'Error updating artwork', error });
    }
});

// Delete artwork by ID
app.delete('/artwork/:id', async (req, res) => {
    try {
        const deletedArtwork = await Artwork.findByIdAndDelete(req.params.id);
        console.log('Deleted artwork:', deletedArtwork); // Log deleted artwork
        res.json({ message: 'Artwork deleted', deletedArtwork });
    } catch (error) {
        console.error('Error deleting artwork:', error);
        res.status(200).json({ message: 'Error deleting artwork', error });
    }
});
// Additional or modified POST and DELETE endpoints for artwork
app.post('/createArtwork', async (req, res) => {
    const newArtwork = new Artwork({
      artist: req.body.artist,
      name: req.body.name,
      imageOfArt: req.body.image,
      price: req.body.price
    });
    try {
      await newArtwork.save();
      console.log('Artwork saved:', newArtwork); // Log saved artwork
      res.status(201).json(newArtwork);
    } catch (error) {
      console.error('Error saving artwork:', error);
      res.status(400).json({ message: 'Error saving artwork', error });
    }
  });
  
  app.delete('/deleteArtwork/:id', async (req, res) => {
    try {
      const deletedArtwork = await Artwork.findByIdAndDelete(req.params.id);
      if (!deletedArtwork) {
        return res.status(404).json({ message: 'Artwork not found' });
      }
      console.log('Deleted artwork:', deletedArtwork); // Log deleted artwork
      res.status(200).json({ message: 'Artwork deleted', deletedArtwork });
    } catch (error) {
      console.error('Error deleting artwork:', error);
      res.status(500).json({ message: 'Error deleting artwork', error });
    }
  });
  
  app.listen(port, host, () => {
      console.log(`App listening at http://${host}:${port}`);
  });
