import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMINS = [
  { username: "admin1", password: "admin123" },
  { username: "admin2", password: "admin456" }
];

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const found = ADMINS.find(a => a.username === form.username && a.password === form.password);
    if (found) {
      localStorage.setItem("admin-auth", form.username);
      window.location.href = "/";
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{maxWidth:400,margin:"100px auto",padding:32,background:"#fff",borderRadius:8,boxShadow:"0 2px 8px #eee"}}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required style={{width:'100%',marginBottom:12,padding:8}} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{width:'100%',marginBottom:12,padding:8}} />
        {error && <div style={{color:'#ff4141',marginBottom:12}}>{error}</div>}
        <button type="submit" style={{width:'100%',padding:10,background:'#222',color:'#fff',border:'none',borderRadius:4}}>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin; 