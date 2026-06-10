import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data.data);
    } catch (err) {
      alert("Please login first");
      navigate("/");
    }
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    navigate("/");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Dashboard</h1>

        {user && (
          <>
            <h2>Welcome, {user.firstName} 👋</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>

            <div className="dashboard-actions">
              <Link to="/tasks">My Tasks</Link>

              {user.role === "admin" && <Link to="/admin">Admin Panel</Link>}

              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
