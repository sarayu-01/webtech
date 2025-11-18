const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  type: { type: String, enum: ["movie", "book"], required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true },

  user: { type: String, required: true },
  rating: { type: Number, min: 1, max: 10, required: true },
  text: { type: String, required: true },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);
