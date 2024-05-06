const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/finaldata', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Failed to connect to MongoDB:', err));
app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
    });
    
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "finalData";
const client = new MongoClient(url);
const db = client.db(dbName);

const port = "8081";
const host = "localhost";

//Get Artists
app.get('/getArtists', async (req, res) => {
    try {
      const artists = await db.collection('artists').find().toArray();
      res.json(artists);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
//Get Artwork
app.get('/getArtwork', async (req, res) => {
    try {
      const artists = await db.collection('artists').find().toArray();
      res.json(artists);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
//Get artists by id
app.get('getArtists/:id', async (req, res) => {
    try {
      const artist = await db.collection('artists').findOne({ _id: req.params.id });
      if (!artist) {
        return res.status(404).json({ message: 'Artist not found' });
      }
      res.json(artist);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
//Get artwork by id
app.get('getArtwork/:id', async (req, res) => {
    try {
      const artist = await db.collection('artists').findOne({ _id: req.params.id });
      if (!artist) {
        return res.status(404).json({ message: 'Artist not found' });
      }
      res.json(artist);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  
  

  






