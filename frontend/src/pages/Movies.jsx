import React, { useMemo, useState } from "react";
import ReviewCard from "../components/ReviewCard.jsx";
import ReviewForm from "../components/ReviewForm.jsx";
import SortBar from "../components/SortBar.jsx";

export default function Movies({ movies = [], reviews = [], addReview }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const merged = useMemo(() => {
    const calcAvg = (id, base) => {
      const list = reviews.filter(r => r.type==='movie' && r.itemId === id);
      if (!list.length) return base;
      return (list.reduce((a,b)=>a+Number(b.rating),0)/list.length);
    };
    return movies.map(m => ({ ...m, avg: calcAvg(m.id, m.rating) }));
  }, [movies, reviews]);

  const filtered = useMemo(() => {
    let arr = merged.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
    if (sortBy === "rating") arr = arr.sort((a,b)=>b.avg - a.avg);
    if (sortBy === "title") arr = arr.sort((a,b)=>a.title.localeCompare(b.title));
    return arr;
  }, [merged, query, sortBy]);

  return (
    <section className="page">
      <h2>Movies</h2>
      <div className="controls-row">
        <input placeholder="Search movies..." value={query} onChange={e=>setQuery(e.target.value)} />
        <SortBar sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <div className="grid">
        {filtered.map(m => (
          <ReviewCard 
            key={m.id} 
            {...m} 
            onClick={() => setSelectedMovie(m)}
          />
        ))}
      </div>
      
      {selectedMovie && (
        <div className="review-overlay">
          <div className="review-modal">
            <h3>Review: {selectedMovie.title}</h3>
            <ReviewForm 
              id={selectedMovie.id} 
              type="movie" 
              addReview={(type, id, text, rating) => {
                addReview(type, id, text, rating);
                setSelectedMovie(null);
              }} 
            />
            <button className="close-btn" onClick={() => setSelectedMovie(null)}>Cancel</button>
          </div>
        </div>
      )}
    </section>
  );
}
