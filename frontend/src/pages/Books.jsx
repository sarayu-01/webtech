import React, { useMemo, useState } from "react";
import ReviewCard from "../components/ReviewCard.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import SortBar from "../components/SortBar.jsx";

export default function Books({ books = [], reviews = [], addReview }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedBook, setSelectedBook] = useState(null);

  const merged = useMemo(() => {
    const calcAvg = (id, base) => {
      const list = reviews.filter(
        (r) => r.type === "book" && r.itemId === id
      );
      if (!list.length) return base;
      return list.reduce((a, b) => a + Number(b.rating), 0) / list.length;
    };

    return books.map((b) => ({
      ...b,
      avg: calcAvg(b._id, b.rating),
    }));
  }, [books, reviews]);

  const filtered = useMemo(() => {
    let arr = merged.filter((b) =>
      b.title.toLowerCase().includes(query.toLowerCase())
    );

    if (sortBy === "rating") arr = arr.sort((a, b) => b.avg - a.avg);
    if (sortBy === "title") arr = arr.sort((a, b) => a.title.localeCompare(b.title));

    return arr;
  }, [merged, query, sortBy]);

  return (
    <section className="page">
      <h2>All Books</h2>

      <div className="controls-row">
        <input
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SortBar sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <div className="grid">
        {filtered.map((b) => (
          <ReviewCard key={b._id} {...b} onClick={() => setSelectedBook(b)} />
        ))}
      </div>

      {selectedBook && (
        <div className="review-overlay">
          <div className="review-modal">
            <h3>Review: {selectedBook.title}</h3>

            <ReviewForm
              id={selectedBook._id}
              type="book"
              addReview={(type, id, text, rating) => {
                addReview(type, id, text, rating);
                setSelectedBook(null);
              }}
            />

            <button className="close-btn" onClick={() => setSelectedBook(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
