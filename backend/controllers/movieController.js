// controllers/movieController.js
const Movie = require("../models/Movie");
const Review = require("../models/Review");

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Failed to add movie" });
  }
};
