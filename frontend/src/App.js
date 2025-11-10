import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import { setAuthToken } from "./api";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setAuthToken(token);
      setLoggedIn(true);
    }
  }, []);

  const onLogin = () => setLoggedIn(true);
  const onLogout = () => setLoggedIn(false);

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        {!loggedIn && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={onLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {/* Private Route */}
        {loggedIn && (
          <>
            <Route path="/dashboard" element={<Dashboard onLogout={onLogout} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}

      </Routes>
    </Router>
  );
}

export default App;
