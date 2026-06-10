import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>My Tasks</h1>
      </div>

      <div className="tasks-grid">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <span className={`status ${task.status}`}>{task.status}</span>

            <span className={`priority ${task.priority}`}>{task.priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
