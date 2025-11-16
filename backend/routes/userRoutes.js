// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserCollection } = require('../models/userModel');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const users = getUserCollection();
    await users.insertOne(req.body);  // name, email, password
    res.send('User registered!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const users = getUserCollection();
    const user = await users.findOne({ email: req.body.email, password: req.body.password });
    if (user) res.send('Login successful!');
    else res.status(400).send('Invalid credentials');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
