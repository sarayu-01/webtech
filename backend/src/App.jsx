import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import Books from "./pages/Books.jsx";
import Reviews from "./pages/Reviews.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AddItem from "./components/AddItem.jsx";

export default function App() {
  const navigate = useNavigate();

  // ========================
  // BACKEND API BASE URL
  // ========================
  const API = "http://localhost:5000"; // change if needed

  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  // ========================
  // LOAD EVERYTHING FROM BACKEND
  // ========================
  async function loadMovies() {
    const res = await fetch(`${API}/movies`);
    setMovies(await res.json());
  }

  async function loadBooks() {
    const res = await fetch(`${API}/books`);
    setBooks(await res.json());
  }

  async function loadReviews() {
    const res = await fetch(`${API}/reviews`);
    setReviews(await res.json());
  }

  useEffect(() => {
    loadMovies();
    loadBooks();
    loadReviews();
  }, []);

  // ========================
  // AUTH WITH BACKEND
  // ========================

  async function login(username, password) {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.ok) {
      setCurrentUser(username);
    }
    return data;
  }

  async function signup(username, password, role = "user") {
    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });

    const data = await res.json();
    if (data.ok) {
      setCurrentUser(username);
    }
    return data;
  }

  function logout() {
    setCurrentUser("");
    navigate("/");
  }

  // ========================
  // ADD REVIEW (POST -> BACKEND)
  // ========================
  async function addReview(type, id, text, rating) {
    const res = await fetch(`${API}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        itemId: id,
        text,
        rating,
        user: currentUser || "Anonymous",
      }),
    });

    const data = await res.json();
    if (data.ok) {
      loadReviews(); // refresh
    }
    return data;
  }

  // ========================
  // ADD ITEM (MOVIE/BOOK)
  // ========================
  async function addItem(kind, item) {
    const endpoint = kind === "movie" ? "/movies" : "/books";

    const res = await fetch(`${API}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    const data = await res.json();
    if (data.ok) {
      if (kind === "movie") loadMovies();
      else loadBooks();
    }
    return data;
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
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/signup" element={<Signup onSignup={signup} />} />
          <Route path="/add" element={<AddItem currentUser={currentUser} addItem={addItem} />} />
        </Routes>
      </main>
    </>
  );
}
