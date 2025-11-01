import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import Books from "./pages/Books.jsx";
import Reviews from "./pages/Reviews.jsx";
import Login from "./pages/Login.jsx";
import AddItem from "./components/AddItem.jsx";

// initial seed arrays (15 movies + 15 books). IDs are unique.
import { seedMovies, seedBooks } from "../seedData.js";

export default function App() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState(() => {
    const s = localStorage.getItem("movies");
    return s ? JSON.parse(s) : seedMovies;
  });
  const [books, setBooks] = useState(() => {
    const s = localStorage.getItem("books");
    return s ? JSON.parse(s) : seedBooks;
  });
  const [reviews, setReviews] = useState(() => {
    const s = localStorage.getItem("reviews");
    return s ? JSON.parse(s) : [];
  });
  const [users, setUsers] = useState(() => {
    const s = localStorage.getItem("users");
    return s ? JSON.parse(s) : [];
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("currentUser") || "";
  });

  // persist
  useEffect(() => localStorage.setItem("movies", JSON.stringify(movies)), [movies]);
  useEffect(() => localStorage.setItem("books", JSON.stringify(books)), [books]);
  useEffect(() => localStorage.setItem("reviews", JSON.stringify(reviews)), [reviews]);
  useEffect(() => localStorage.setItem("users", JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem("currentUser", currentUser), [currentUser]);

  function loginOrRegister(username, password) {
    const u = users.find((x) => x.username === username);
    if (!u) {
      const nu = { username, password };
      setUsers((p) => [...p, nu]);
      setCurrentUser(username);
      return { ok: true };
    }
    if (u.password === password) {
      setCurrentUser(username);
      return { ok: true };
    }
    return { ok: false, message: "Invalid password" };
  }

  function logout() {
    setCurrentUser("");
    localStorage.removeItem("currentUser");
    navigate("/");
  }

  function addReview(type, id, text, rating) {
    const r = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      type,
      itemId: id,
      text,
      rating,
      user: currentUser || "Anonymous",
      createdAt: new Date().toISOString(),
    };
    setReviews((p) => [r, ...p]);
  }

  function addItem(kind, item) {
    // item must include id, title, genre, rating, image
    if (kind === "movie") setMovies((p) => [item, ...p]);
    else setBooks((p) => [item, ...p]);
  }

  return (
    <>
      <Navbar currentUser={currentUser} onLogout={logout} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home movies={movies} books={books} reviews={reviews} />} />
          <Route path="/movies" element={<Movies movies={movies} reviews={reviews} addReview={addReview} />} />
          <Route path="/books" element={<Books books={books} reviews={reviews} addReview={addReview} />} />
          <Route path="/reviews" element={<Reviews reviews={reviews} movies={movies} books={books} />} />
          <Route path="/login" element={<Login onLogin={loginOrRegister} />} />
          <Route path="/add" element={<AddItem currentUser={currentUser} addItem={addItem} />} />
        </Routes>
      </main>
    </>
  );
}
