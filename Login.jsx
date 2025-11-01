import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!username || !password) { setMsg("Fill both fields"); return; }
    const res = onLogin(username.trim(), password);
    if (res.ok) {
      setMsg("Logged in");
      nav("/");
    } else setMsg(res.message || "Failed");
  }

  return (
    <section className="page login-page">
      <h2>Login / Register</h2>
      <form className="login-form" onSubmit={submit}>
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="form-row">
          <button type="submit" className="btn">Submit</button>
        </div>
        {msg && <div className="msg">{msg}</div>}
      </form>
    </section>
  );
}
