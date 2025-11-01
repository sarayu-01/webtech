import React from "react";

export default function Reviews({ reviews = [], movies = [], books = [] }) {
  function titleFor(r) {
    const arr = r.type === "movie" ? movies : books;
    return arr.find(a => a.id === r.itemId)?.title || "Unknown";
  }
  return (
    <section className="page">
      <h2>All Reviews</h2>
      {reviews.length === 0 ? <p>No reviews yet.</p> : (
        <div className="reviews-list">
          {reviews.map(r => (
            <div key={r.id} className="review-row">
              <div><strong>{titleFor(r)}</strong> <em>({r.type})</em></div>
              <div>⭐ {r.rating}</div>
              <p>{r.text}</p>
              <div className="small">by {r.user} · {new Date(r.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
