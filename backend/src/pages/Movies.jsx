import React, { useMemo, useState, useEffect } from "react";
import ReviewCard from "../components/ReviewCard.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import SortBar from "../components/SortBar.jsx";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // Load data from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const [movRes, revRes] = await Promise.all([
          fetch("http://localhost:5000/api/movies"),
          fetch("http://localhost:5000/api/reviews")
        ]);

        const movData = await movRes.json();
        const revData = await revRes.json();

        if (!movRes.ok) throw new Error(movData.message || "Failed to load movies");
        if (!revRes.ok) throw new Error(revData.message || "Failed to load reviews");

        setMovies(movData);
        setReviews(revData);
      } catch (err) {
        console.error(err);
        setMsg(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Add review → POST to backend
  async function addReview(type, id, text, rating) {
    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, itemId: id, text, rating })
      });

      const data = await res.json();
      if (!res.ok) {
