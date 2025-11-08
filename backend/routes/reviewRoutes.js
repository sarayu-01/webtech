// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { getReviewCollection } = require('../models/reviewModel');

// Add review
router.post('/add', async (req, res) => {
  try {
    const reviews = getReviewCollection();
    await reviews.insertOne(req.body); // itemType: 'movie' or 'book', itemId, reviewText
    res.send('Review added!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// List reviews for an item
router.get('/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const reviews = getReviewCollection();
    const all = await reviews.find({ itemType: type, itemId: id }).toArray();
    res.json(all);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
