// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { getBookCollection } = require('../models/bookModel');

// Add book
router.post('/add', async (req, res) => {
  try {
    const books = getBookCollection();
    await books.insertOne(req.body); // title, author, description
    res.send('Book added!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// List books
router.get('/', async (req, res) => {
  try {
    const books = getBookCollection();
    const all = await books.find({}).toArray();
    res.json(all);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
