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
app.get('/artists', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Artwork
app.get('/artwork', async (req, res) => {
    try {
        const artwork = await Artwork.find();
        res.json(artwork);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get artists by id
app.get('/artists/:id', async (req, res) => {
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
app.get('/artwork/:id', async (req, res) => {
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

//Create a new artist
app.post('/artists', async (req, res) => {
    try {
        const artist = new Artist(req.body);
        await artist.save();
        res.status(201).send(artist);
    } catch (error) {
        res.status(400).send(error);
    }
});
//Create a new artwork
app.post('/artwork', async (req, res) => {
    try {
        const artwork = new Artwork(req.body);
        await artwork.save();
        res.status(201).send(artwork);
    } catch (error) {
        res.status(400).send(error);
    }
});
// Update an artist by ID
app.patch('/artists/:id', async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!artist) {
            return res.status(404).send();
        }
        res.send(artist);
    } catch (error) {
        res.status(400).send(error);
    }
});
// Update artwork by ID
app.patch('/artwork/:id', async (req, res) => {
    try {
        const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!artwork) {
            return res.status(404).send();
        }
        res.send(artwork);
    } catch (error) {
        res.status(400).send(error);
    }
});
// Delete an artist by ID
app.delete('/artists/:id', async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if (!artist) {
            return res.status(404).send();
        }
        res.send(artist);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Delete an artwork by ID
app.delete('/artwork/:id', async (req, res) => {
    try {
        const artwork = await Artwork.findByIdAndDelete(req.params.id);
        if (!artwork) {
            return res.status(404).send();
        }
        res.send(artwork);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.listen(port, host, () => {
    console.log(`App listening at http://${host}:${port}`);
});
