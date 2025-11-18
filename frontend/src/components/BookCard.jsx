import React from "react";

export default function BookCard({ title, cover, rating }) {
  return (
    <div className="card">
      <img src={cover} alt={title} />
      <h4>{title}</h4>
      <p>Rating: {rating}</p>
    </div>
  );
}
