// models/reviewModel.js
const { getDB } = require('../config/db');

function getReviewCollection() {
  return getDB().collection('reviews');
}

module.exports = { getReviewCollection };
