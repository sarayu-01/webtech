import React, { useState } from "react";

export default function ReviewForm({ id, type, addReview }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(8);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    addReview(type, id, text, rating);
    setText("");
    setRating(8);
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="form-row">
        <label>⭐</label>
        <input
          type="number"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
