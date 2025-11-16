import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const nav = useNavigate();

  // User login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Admin login state (structure only for now)
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const [msg, setMsg] = useState("");
  async function submitUser(e) {
    e.preventDefault();
    if (!username || !password) { setMsg("Fill both fields"); return; }
  
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
  
      const data = await res.json();
      if (res.ok) {
        setMsg("Logged in!");
        nav("/");
      } else {
        setMsg(data.message || "Login failed");
      }
    } catch (err) {
      setMsg("Server error");
      console.error(err);
    }
  }
  
  async function signupUser(e) {
    e.preventDefault();
    if (!username || !password) { setMsg("Fill both fields"); return; }
  
    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
  
      const data = await res.json();
      if (res.ok) {
        setMsg("Signup successful!");
        nav("/");
      } else {
        setMsg(data.message || "Signup failed");
      }
    } catch (err) {
      setMsg("Server error");
      console.error(err);
    }
  }
  
  async function submitAdmin(e) {
    e.preventDefault();
    if (!adminUser || !adminPass) { setMsg("Fill both fields"); return; }
  
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        // using same login endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: adminUser, password: adminPass })
      });
  
      const data = await res.json();
      if (res.ok) {
        setMsg("Admin logged in!");
        nav("/");
      } else {
        setMsg(data.message || "Failed");
      }
    } catch (err) {
      setMsg("Server error");
      console.error(err);
    }
  }
  
}

  return (
    <section className="page login-page">
      <h2>Login / Register</h2>

      {/* Two sections: User and Admin - same style, side-by-side if CSS allows */}
      <div className="login-grid">
        <div className="login-section">
          <h3>User Login</h3>
          <form className="login-form" onSubmit={submitUser}>
            <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <div className="form-row">
              <button type="submit" className="btn">Login</button>
              <button type="button" className="btn" onClick={signupUser} style={{marginLeft:8}}>Sign up</button>
            </div>
          </form>
        </div>

        <div className="login-section">
          <h3>Admin Login</h3>
          <form className="login-form" onSubmit={submitAdmin}>
            <input placeholder="Admin Username" value={adminUser} onChange={e=>setAdminUser(e.target.value)} />
            <input placeholder="Admin Password" type="password" value={adminPass} onChange={e=>setAdminPass(e.target.value)} />
            <div className="form-row">
              <button type="submit" className="btn">Login</button>
              <button type="button" className="btn" onClick={(e)=>{
                e.preventDefault();
                // For admin signup we reuse the same signupUser flow but using admin credentials
                if (!adminUser || !adminPass) { setMsg("Fill both fields"); return; }
                if (onSignup) {
                  const res = onSignup(adminUser.trim(), adminPass);
                  if (res && res.ok) { setMsg("Admin signed up"); nav('/'); }
                  else setMsg(res && res.message ? res.message : 'Signup failed');
                } else setMsg('Signup handler not configured');
              }} style={{marginLeft:8}}>Sign up</button>
            </div>
          </form>
        </div>
      </div>

      {msg && <div className="msg">{msg}</div>}
    </section>
  );
}
