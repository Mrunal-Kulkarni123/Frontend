import { useEffect, useState } from "react";
import api from "../api/axios";
import "./AdminDashboard.css";
function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const usersRes = await api.get("/admin/users");
      const tasksRes = await api.get("/admin/tasks");

      setUsers(usersRes.data.data);
      setTasks(tasksRes.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-stats">
        <div className="stat-card">
          <h2>{users.length}</h2>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <h2>{tasks.length}</h2>
          <p>Total Tasks</p>
        </div>
      </div>

      <div className="section">
        <h2>Users</h2>

        {users.map((user) => (
          <div key={user._id} className="user-row">
            <strong>
              {user.firstName} {user.lastName}
            </strong>
            {" - "}
            {user.email}
            {" - "}
            {user.role}
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Tasks</h2>

        {tasks.map((task) => (
          <div key={task._id} className="task-row">
            <div>
              <strong>{task.title}</strong>
              <br />
              <small>
                {task.createdBy?.firstName} {task.createdBy?.lastName}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
