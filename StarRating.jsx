import React from "react";

/**
 * value: numeric rating (0-10 or 0-5). We map to 5 stars.
 * If value > 5 assume it's out of 10, convert to 5-scale.
 */
export default function StarRating({ value = 0 }) {
  let v = Number(value);
  if (v > 5) v = (v / 10) * 5; // convert 10-scale to 5-scale
  const full = Math.round(v); // number of filled stars
  const stars = [1,2,3,4,5].map((n) => n <= full);
  return (
    <span className="stars" aria-hidden>
      {stars.map((filled, i) => (
        <span key={i} className={filled ? "star filled" : "star"}>★</span>
      ))}
    </span>
  );
}
