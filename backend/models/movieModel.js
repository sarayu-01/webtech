// models/movieModel.js
const { getDB } = require('../config/db');

function getMovieCollection() {
  return getDB().collection('movies');
}

module.exports = { getMovieCollection };
