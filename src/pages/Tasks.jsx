import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", taskData);

      setTaskData({
        title: "",
        description: "",
        priority: "medium",
      });

      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await api.patch(`/tasks/${id}`, {
        status: "completed",
      });

      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
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
      <form className="task-form" onSubmit={handleCreateTask}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={taskData.description}
          onChange={handleChange}
        />

        <select
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Create Task</button>
      </form>
      <div className="tasks-grid">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <span className={`status ${task.status}`}>{task.status}</span>

            <span className={`priority ${task.priority}`}>{task.priority}</span>
            <div className="task-actions">
              {task.status !== "completed" && (
                <button onClick={() => handleComplete(task._id)}>
                  Mark Complete
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
