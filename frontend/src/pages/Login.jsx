import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin, onSignup }) {
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
    if (!onLogin) { setMsg("Login not configured"); return; }
    const res = await onLogin(username.trim(), password);
    if (res && res.ok) {
      setMsg("Logged in");
      nav("/");
    } else setMsg(res && res.message ? res.message : "Failed");
  }

  async function signupUser(e) {
    e && e.preventDefault();
    if (!username || !password) { setMsg("Fill both fields"); return; }
    if (!onSignup) { setMsg("Signup not configured"); return; }
    const res = await onSignup(username.trim(), password);
    if (res && res.ok) {
      setMsg("Signed up");
      nav("/");
    } else setMsg(res && res.message ? res.message : "Signup failed");
  }

  async function submitAdmin(e) {
    e.preventDefault();
    // Structure only: keep same minimal validation for now
    if (!adminUser || !adminPass) { setMsg("Fill both fields"); return; }
    if (!onLogin) { setMsg("Login not configured"); return; }
    const res = await onLogin(adminUser.trim(), adminPass);
    if (res && res.ok) {
      setMsg("Admin logged in");
      nav("/");
    } else setMsg(res && res.message ? res.message : "Failed");
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
