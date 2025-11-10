import React, { useState } from 'react'
import API, { setAuthToken } from "../api";
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {

  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      setMsg("Logged in");
      onLogin();
    } catch (err) {
      setMsg(err.response?.data?.message || "Login error");
    }
  };

  return (
    <>

    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})} className="w-full p-2 border rounded" />
        <input required type="password" placeholder="Password" value={form.password}
          onChange={e => setForm({...form, password: e.target.value})} className="w-full p-2 border rounded" />
        <button className="w-full p-2 bg-green-600 text-white rounded">Login</button>
        <p style={{textAlign:"center"}}>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
      
    </>
  )
}

export default Login
