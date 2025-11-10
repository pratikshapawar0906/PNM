import React, { useState } from 'react'
import API from '../api';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';

const Register = () => {

  const [form, setForm] = useState({ name: "", email: "", password: "", subscriptionStart: "", duration: "monthly" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      handleSuccess("Registered. Now login.");
    } catch (err) {
      handleError(err.response?.data?.message || "Error");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        
        {/* Centered Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={submit} className="space-y-4">

          <input
            required
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <input
            required
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <label className="block">Subscription Start Date</label>
          <input
            type="date"
            value={form.subscriptionStart}
            onChange={e => setForm({ ...form, subscriptionStart: e.target.value })}
            className="w-full p-2 border rounded"
          />

          <select
            value={form.duration}
            onChange={e => setForm({ ...form, duration: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <button className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
            Register
          </button>

          {/* Centered login link with new color */}
          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>

        </form>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Register;
