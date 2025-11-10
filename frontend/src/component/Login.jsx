import React, { useState } from 'react'
import API, { setAuthToken } from "../api";
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';

const Login = ({ onLogin }) => {

  const [form, setForm] = useState({ email: "", password: "" });
  
  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      handleSuccess("Logged in");
      onLogin();
    } catch (err) {
      handleError(err.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          <input
            required
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          <button className="w-full p-3 bg-green-600 hover:bg-green-700 transition text-white rounded-md font-medium">
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
