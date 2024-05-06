const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8081;
const host = 'localhost';

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/finaldata', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

const Artist = require('./models/artist'); 
const Artwork = require('./models/artwork'); 

// Get Artists
app.get('/getArtists', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Artwork
app.get('/getArtwork', async (req, res) => {
    try {
        const artwork = await Artwork.find();
        res.json(artwork);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get artists by id
app.get('/getArtists/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.json(artist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get artwork by id
app.get('/getArtwork/:id', async (req, res) => {
    try {
        const artwork = await Artwork.findById(req.params.id);
        if (!artwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }
        res.json(artwork);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, host, () => {
    console.log(`App listening at http://${host}:${port}`);
});
