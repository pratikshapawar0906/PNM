import React, { useState } from 'react'
import API from '../api';
import { Link } from 'react-router-dom';

const Register = () => {

    const [form, setForm] = useState({ email: "", password: "", subscriptionStart: "", duration: "monthly" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      setMsg("Registered. Now login.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
}
  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          className="w-full p-2 border rounded" />
        <input required type="password" placeholder="Password" value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          className="w-full p-2 border rounded" />
        <label className="block">Subscription Start</label>
        <input type="date" value={form.subscriptionStart}
          onChange={e => setForm({...form, subscriptionStart: e.target.value})}
          className="w-full p-2 border rounded" />
        <select value={form.duration} onChange={e => setForm({...form, duration: e.target.value})}
          className="w-full p-2 border rounded">
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button className="w-full p-2 bg-blue-600 text-white rounded">Register</button>
         <p  style={{textAlign:"center"}}>Already have an account? <Link to="/login">Login</Link></p>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
    </>
  )
}

export default Register
