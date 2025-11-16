// models/bookModel.js
const { getDB } = require('../config/db');

function getBookCollection() {
  return getDB().collection('books');
}

module.exports = { getBookCollection };
