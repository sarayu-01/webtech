import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  // User signup state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Admin signup state
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const [msg, setMsg] = useState("");

  // USER SIGNUP
  async function signupUser(e) {
    e.preventDefault();
    if (!username || !password) { setMsg("Fill both fields"); return; }

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("User signed up!");
        nav("/");
      } else {
        setMsg(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setMsg("Server error");
    }
  }

  // ADMIN SIGNUP
  async function signupAdmin(e) {
    e.preventDefault();
    if (!adminUser || !adminPass) { setMsg("Fill both fields"); return; }

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: adminUser,
          password: adminPass,
          isAdmin: true   // send flag if you want admin logic later
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("Admin signed up!");
        nav("/");
      } else {
        setMsg(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setMsg("Server error");
    }
  }

  return (
    <section className="page login-page">
      <h2>Sign up</h2>

      <div className="login-grid">
        <div className="login-section">
          <h3>User Sign up</h3>
          <form className="login-form" onSubmit={signupUser}>
            <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <div className="form-row">
              <button type="submit" className="btn">Sign up</button>
            </div>
          </form>
        </div>

        <div className="login-section">
          <h3>Admin Sign up</h3>
          <form className="login-form" onSubmit={signupAdmin}>
            <input placeholder="Admin Username" value={adminUser} onChange={e=>setAdminUser(e.target.value)} />
            <input placeholder="Admin Password" type="password" value={adminPass} onChange={e=>setAdminPass(e.target.value)} />
            <div className="form-row">
              <button type="submit" className="btn">Sign up</button>
            </div>
          </form>
        </div>
      </div>

      {msg && <div className="msg">{msg}</div>}
    </section>
  );
}
