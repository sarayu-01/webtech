import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ currentUser, onLogout }) {
  return (
    <header className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">ReviewHub</Link>
        <nav className="links">
          <Link to="/movies">Movies</Link>
          <Link to="/books">Books</Link>
          <Link to="/reviews">Reviews</Link>
        </nav>
      </div>

      <div className="nav-right">
        {currentUser ? (
          <>
            <span className="user">Hi, {currentUser}</span>
            <Link to="/add" className="btn">Add</Link>
            <button className="btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </header>
  );
}
