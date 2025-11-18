import React from "react";

export default function ReviewCard({
  title,
  cover,
  poster,
  avg,
  rating,
  onClick
}) {
  return (
    <div className="card" onClick={onClick}>
      <img src={poster || cover} alt={title} />
      <h4>{title}</h4>
      <p>Rating: {avg || rating}</p>
    </div>
  );
}
