import React from "react";
import StarRating from "./StarRating.jsx";

export default function ReviewCard({ id, title, genre, image, rating, review, onClick }) {
  const src = image || "https://via.placeholder.com/220x330.png?text=No+Image";
  return (
    <article className="review-card" onClick={onClick}>
      <img src={src} alt={title} className="poster" onError={(e)=>e.target.src="https://via.placeholder.com/220x330.png?text=No+Image"} />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <div className="meta">
          <span className="genre">{genre}</span>
          <StarRating value={rating} />
        </div>
        <p className="excerpt">{review}</p>
      </div>
    </article>
  );
}
