import React, { useEffect, useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch everything from backend
  useEffect(() => {
    async function loadData() {
      try {
        const [revRes, movRes, bookRes] = await Promise.all([
          fetch("http://localhost:5000/api/reviews"),
          fetch("http://localhost:5000/api/movies"),
          fetch("http://localhost:5000/api/books")
        ]);

        const revData = await revRes.json();
        const movData = await movRes.json();
        const bookData = await bookRes.json();

        if (!revRes.ok) throw new Error(revData.message || "Failed to load reviews");
        if (!movRes.ok) throw new Error(movData.message || "Failed to load movies");
        if (!bookRes.ok) throw new Error(bookData.message || "Failed to load books");

        setReviews(revData);
        setMovies(movData);
        setBooks(bookData);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function titleFor(r) {
    const arr = r.type === "movie" ? movies : books;
    return arr.find(a => a._id === r.itemId)?.title || "Unknown";
  }

  if (loading) return <section className="page"><p>Loading...</p></section>;
  if (error) return <section className="page"><p>Error: {error}</p></section>;

  return (
    <section className="page">
      <h2>All Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map(r => (
            <div key={r._id} className="review-row">
              <div>
                <strong>{titleFor(r)}</strong> <em>({r.type})</em>
              </div>
              <div>⭐ {r.rating}</div>
              <p>{r.text}</p>
              <div className="small">
                by {r.user} · {new Date(r.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
