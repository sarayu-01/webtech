import React from "react";

export default function SortBar({ sortBy, setSortBy }) {
  return (
    <div className="sortbar">
      <label>Sort:</label>
      <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
        <option value="default">Default</option>
        <option value="rating">Rating (high → low)</option>
        <option value="title">Title (A → Z)</option>
      </select>
    </div>
  );
}
