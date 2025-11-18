const Review = require("../models/Review");

exports.getReviews = async (req, res) => {
  try {
    const items = await Review.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create({
      type: req.body.type,
      itemId: req.body.itemId,
      user: req.body.user,
      rating: req.body.rating,
      text: req.body.text
    });

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Failed to create review", error: err.message });
  }
};
