const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// Get all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("book", "title")
            .populate("movie", "title");
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single review
router.get("/:id", async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate("book", "title")
            .populate("movie", "title");
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a review
router.post("/", async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a review
router.put("/:id", async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a review
router.delete("/:id", async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: "Review deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
