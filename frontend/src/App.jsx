import React, { useState, useEffect } from "react";
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

  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser") || ""
  );

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then(setMovies)
      .catch((e) => console.error("Movies fetch failed", e));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then(setBooks)
      .catch((e) => console.error("Books fetch failed", e));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then(setReviews)
      .catch((e) => console.error("Reviews fetch failed", e));
  }, []);

  async function login(email, password) {
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return { ok: false, message: data.message };

      setCurrentUser(data.user.email);
      localStorage.setItem("currentUser", data.user.email);
      return { ok: true };
    } catch {
      return { ok: false, message: "Server error" };
    }
  }

  async function signup(name, email, password) {
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) return { ok: false, message: data.message };

      setCurrentUser(email);
      localStorage.setItem("currentUser", email);
      return { ok: true };
    } catch {
      return { ok: false, message: "Server error" };
    }
  }

  function logout() {
    setCurrentUser("");
    localStorage.removeItem("currentUser");
    navigate("/");
  }

  async function addReview(type, itemId, text, rating) {
    const res = await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        itemId,
        text,
        rating,
        user: currentUser || "Anonymous",
      }),
    });

    const data = await res.json();
    setReviews((prev) => [data, ...prev]);
  }

  async function addItem(kind, item) {
    const res = await fetch(`http://localhost:5000/api/${kind}s`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    const data = await res.json();
    if (kind === "movie") setMovies((prev) => [data, ...prev]);
    else setBooks((prev) => [data, ...prev]);
  }

  return (
    <>
      <Navbar currentUser={currentUser} onLogout={logout} />

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<Home movies={movies} books={books} reviews={reviews} />}
          />
          <Route
            path="/movies"
            element={<Movies movies={movies} reviews={reviews} addReview={addReview} />}
          />
          <Route
            path="/books"
            element={<Books books={books} reviews={reviews} addReview={addReview} />}
          />
          <Route
            path="/reviews"
            element={<Reviews reviews={reviews} movies={movies} books={books} />}
          />

          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/signup" element={<Signup onSignup={signup} />} />
          <Route
            path="/add"
            element={<AddItem currentUser={currentUser} addItem={addItem} />}
          />
        </Routes>
      </main>
    </>
  );
}
