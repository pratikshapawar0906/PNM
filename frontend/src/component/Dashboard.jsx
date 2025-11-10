import React, { useEffect, useState } from 'react'
import API, { setAuthToken } from "../api";

const Dashboard = () => {

    const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const onLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
  };


  const fetchStatus = async () => {
    setLoading(true);
    try {
      // get current logged in user email from token? For simplicity, request profile from /me isn't implemented
      // Instead, backend has /status/:email endpoint. We'll store email in localStorage during login in a real app.
      const token = localStorage.getItem("token");
      setAuthToken(token);
      // Simplest: add email to localStorage at login. For now assume 'email' is stored:
      const email = localStorage.getItem("email");
      if (!email) {
        setStatus({ message: "Email missing. Re-login." });
        setLoading(false);
        return;
      }
      const res = await API.get(`/status/${email}`);
      setStatus(res.data);
    } catch (err) {
      setStatus({ message: err.response?.data?.message || "Failed to fetch status" });
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchStatus(); }, []);

  const renew = async (type) => {
    try {
      await API.post("/renew", { duration: type }); // token required
      await fetchStatus();
      alert("Renewed!");
    } catch (err) {
      alert(err.response?.data?.message || "Renew failed");
    }
  };

  const accessService = async () => {
    try {
      const res = await API.get("/protected-service");
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Cannot access service");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <button onClick={() => { localStorage.clear(); setAuthToken(null); onLogout(); }}
          className="px-3 py-1 border rounded">Logout</button>
      </div>

      {status ? (
        <div className="mt-4 space-y-3">
          <p><strong>Email:</strong> {status.email}</p>
          <p><strong>Status:</strong> <span className={status.status === "Active" ? "text-green-600" : "text-red-600"}>{status.status}</span></p>
          <p><strong>Ends:</strong> {new Date(status.subscriptionEnd).toLocaleString()}</p>

          {status.status === "Active" ? (
            <div>
              <button onClick={accessService} className="px-4 py-2 bg-indigo-600 text-white rounded">Use Service</button>
              <div className="mt-3">
                <p>Extend subscription:</p>
                <div className="space-x-2">
                  <button onClick={() => renew("monthly")} className="px-3 py-1 border rounded">+1 month</button>
                  <button onClick={() => renew("yearly")} className="px-3 py-1 border rounded">+1 year</button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm">Subscription expired — renew to regain access.</p>
              <div className="mt-2 space-x-2">
                <button onClick={() => renew("monthly")} className="px-3 py-1 border rounded">Renew Monthly</button>
                <button onClick={() => renew("yearly")} className="px-3 py-1 border rounded">Renew Yearly</button>
              </div>
            </div>
          )}
        </div>
      ) : <p>No status found</p>}
    </div>
      
    </>
  )
}

export default Dashboard
