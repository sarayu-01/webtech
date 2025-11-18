import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddItem({ currentUser, addItem }) {
  const nav = useNavigate();
  const [kind, setKind] = useState("movie");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");

  function submit(e) {
  e.preventDefault();

  if (!currentUser) { 
    alert("Please login to add items."); 
    nav("/login"); 
    return; 
  }

  if (!title || !genre) { 
    alert("Title and genre required"); 
    return; 
  }

  let item;

  if (kind === "movie") {
    item = { 
      title, 
      genre, 
      rating: Number(rating) || 0, 
      poster: image 
    };
  } else {
    item = { 
      title, 
      genre, 
      rating: Number(rating) || 0, 
      cover: image
    };
  }

  addItem(kind, item);
  nav(kind === "movie" ? "/movies" : "/books");
}


  return (
    <section className="page">
      <h2>Add {kind === "movie" ? "Movie" : "Book"}</h2>
      <form className="add-form" onSubmit={submit}>
        <label>Type</label>
        <select value={kind} onChange={e=>setKind(e.target.value)}>
          <option value="movie">Movie</option>
          <option value="book">Book</option>
        </select>

        <label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} />

        <label>Genre</label>
        <input value={genre} onChange={e=>setGenre(e.target.value)} />

        <label>Rating (0–10)</label>
        <input type="number" min="0" max="10" value={rating} onChange={e=>setRating(e.target.value)} />

        <label>Image URL</label>
        <input value={image} onChange={e=>setImage(e.target.value)} placeholder="https://..." />

        <div className="form-row">
          <button className="btn" type="submit">Add Item</button>
        </div>
      </form>
    </section>
  );
}
