import React from "react";

export default function Reviews({ reviews = [], movies = [], books = [] }) {

  function getTitle(type, itemId) {
    if (type === "movie") {
      const movie = movies.find(m => m._id === itemId);
      return movie ? movie.title : "Unknown Movie";
    }
    if (type === "book") {
      const book = books.find(b => b._id === itemId);
      return book ? book.title : "Unknown Book";
    }
    return "Unknown";
  }

  return (
    <section className="page">
      <h2>All Reviews</h2>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      <div className="reviews-list">
        {reviews.map(r => (
          <div key={r._id} className="review-row">
            <div>
              <strong>{getTitle(r.type, r.itemId)}</strong>
              <em> ({r.type})</em>
            </div>

            <div>⭐ {r.rating}</div>

            <p>{r.text}</p>

            <div className="small">
              by {r.user || "Anonymous"} ·{" "}
              {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
