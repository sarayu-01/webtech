import React from "react";

export default function MovieCard({ title, poster, rating }) {
  return (
    <div className="card">
      <img src={poster} alt={title} />
      <h4>{title}</h4>
      <p>Rating: {rating}</p>
    </div>
  );
}
