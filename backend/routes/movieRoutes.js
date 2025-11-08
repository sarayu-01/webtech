// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const { getMovieCollection } = require('../models/movieModel');

// Add movie
router.post('/add', async (req, res) => {
  try {
    const movies = getMovieCollection();
    await movies.insertOne(req.body); // title, genre, description
    res.send('Movie added!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// List movies
router.get('/', async (req, res) => {
  try {
    const movies = getMovieCollection();
    const all = await movies.find({}).toArray();
    res.json(all);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
