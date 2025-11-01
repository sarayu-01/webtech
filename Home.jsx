import React from "react";
import ReviewCard from "../components/ReviewCard.jsx";
import { Link } from "react-router-dom";

export default function Home({ movies = [], books = [] }) {
  return (
    <section className="page home">
      <h2>Welcome to ReviewHub</h2>
      <p className="lead">Discover curated movies and books — rate, review, and add your favorites.</p>

      <h3>Top Movies</h3>
      <div className="grid">
        {movies.slice(0,6).map(m => <ReviewCard key={m.id} {...m} />)}
      </div>

      <h3>Top Books</h3>
      <div className="grid">
        {books.slice(0,6).map(b => <ReviewCard key={b.id} {...b} />)}
      </div>

      <div className="cta">
        <Link to="/movies" className="btn">See all movies</Link>
        <Link to="/books" className="btn">See all books</Link>
      </div>
    </section>
  );
}
