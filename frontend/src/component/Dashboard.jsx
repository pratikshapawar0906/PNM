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
      const token = localStorage.getItem("token");
      setAuthToken(token);
      const res = await API.get("/api/me"); // returns subscriptionEnd
  
      const now = new Date();
      const subscriptionEnd = new Date(res.data.subscriptionEnd);
      const computedStatus = now <= subscriptionEnd ? "Active" : "Expired";
  
      setStatus({
        ...res.data,
        status: computedStatus
      });
    } catch (err) {
      setStatus({ message: err.response?.data?.message || "Failed to fetch status" });
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
  
        <h2 className="text-2xl font-bold text-center mb-4">Dashboard</h2>
  
        <div className="flex justify-end">
          <button 
            onClick={onLogout}
            className="text-sm text-red-600 hover:underline">
            Logout
          </button>
        </div>
  
        {status ? (
          <div className="mt-4  space-y-3">
            <p><strong>Email:</strong> {status.email}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={status.status === "Active" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                {status.status}
              </span>
            </p>
            <p><strong>Ends:</strong> {new Date(status.subscriptionEnd).toLocaleDateString()}</p>
  
            {status.status === "Active" ? (
              <>
                <button 
                  onClick={accessService} 
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mt-3">
                  Use Service
                </button>
  
                <p className="mt-4 font-medium">Extend Subscription</p>
                <div className="flex justify-center gap-3 mt-2">
                  <button 
                    onClick={() => renew("monthly")} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    +1 Month
                  </button>
                  <button 
                    onClick={() => renew("yearly")} 
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    +1 Year
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-red-600 mt-2">Subscription expired — renew to regain access.</p>
                <div className="flex justify-center gap-3 mt-3">
                  <button 
                    onClick={() => renew("monthly")} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Renew Monthly
                  </button>
                  <button 
                    onClick={() => renew("yearly")} 
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Renew Yearly
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-center mt-4">No status found</p>
        )}
      </div>
    </div>
  );

}

export default Dashboard
