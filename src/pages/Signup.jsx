import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ onSignup }) {
  const nav = useNavigate();

  // User signup state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Admin signup state
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const [msg, setMsg] = useState("");

  async function signupUser(e) {
    e.preventDefault();
    if (!username || !password) { setMsg("Fill both fields"); return; }
    if (!onSignup) { setMsg("Signup not configured"); return; }
    const res = await onSignup(username.trim(), password, 'user');
    if (res && res.ok) {
      setMsg("Signed up");
      nav("/");
    } else setMsg(res && res.message ? res.message : "Signup failed");
  }

  async function signupAdmin(e) {
    e.preventDefault();
    if (!adminUser || !adminPass) { setMsg("Fill both fields"); return; }
    if (!onSignup) { setMsg("Signup not configured"); return; }
    const res = await onSignup(adminUser.trim(), adminPass, 'admin');
    if (res && res.ok) {
      setMsg("Admin signed up");
      nav("/");
    } else setMsg(res && res.message ? res.message : "Signup failed");
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
