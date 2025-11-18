import React from "react";
import { Link } from "react-router-dom";

export default function Home({ movies, books, reviews }) {
  return (
    <div className="home-container">

      <h1 align="center">WELCOME TO REVIEW HUB</h1>

      <section>
        <h2>Movies</h2>

        {movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          <div className="grid">
            {movies.slice(0, 4).map((m) => (
              <Link key={m._id || m.id} to="/movies" className="item-card">
                <img
                  src={m.poster}
                  alt={m.title}
                  className="poster"
                />
                <p>{m.title}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Books</h2>

        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <div className="grid">
            {books.slice(0, 4).map((b) => (
              <Link key={b._id || b.id} to="/books" className="item-card">
                <img
                  src={b.image}
                  alt={b.title}
                  className="poster"
                />
                <p>{b.title}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Latest Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul>
            {reviews.slice(0, 5).map((r) => (
              <li key={r._id}>{r.text}</li>
            ))}
          </ul>
        )}
      </section>

    </div>
  );
}
