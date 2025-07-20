import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Register from "./components/Register";
import { taskAPI } from "./services/api";
import "./App.css";
import "./assets/auth.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'register'

  // Check if user is logged in on component mount
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userId = localStorage.getItem("userId");

    if (userEmail && userId) {
      setUser({ email: userEmail, userId });
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskAPI.getAllTasks();
      setTasks(response.data);
    } catch (err) {
      setError("Failed to fetch tasks. Make sure you're logged in.");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    fetchTasks();
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setTasks([]);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setUser(null);
    setTasks([]);
    setAuthMode("login");
  };

  const handleTaskCreate = async (newTask) => {
    try {
      const response = await taskAPI.createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (err) {
      setError("Failed to create task");
      console.error("Error creating task:", err);
    }
  };

  const handleTaskUpdate = async (id, updatedTask) => {
    try {
      const response = await taskAPI.updateTask(id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task))
      );
    } catch (err) {
      setError("Failed to update task");
      console.error("Error updating task:", err);
    }
  };

  const handleTaskDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskAPI.deleteTask(id);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } catch (err) {
        setError("Failed to delete task");
        console.error("Error deleting task:", err);
      }
    }
  };
  if (!user) {
    if (authMode === "login") {
      return (
        <Login
          onLogin={handleLogin}
          switchToRegister={() => setAuthMode("register")}
        />
      );
    } else {
      return (
        <Register
          onRegister={handleRegister}
          switchToLogin={() => setAuthMode("login")}
        />
      );
    }
  }

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="app-container">
      <div className="main-layout">
        {/* Left: user info & logout */}
        <div className="left-panel">
          <div>
            <h2>Task Manager</h2>
            <p>
              <strong>User:</strong>
              <br />
              {user.email}
            </p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Middle: Task form */}
        <div className="center-panel">
          {error && (
            <div className="error-message">
              {error}
              <button onClick={fetchTasks} className="retry-btn">
                Retry
              </button>
            </div>
          )}
          <TaskForm onTaskCreate={handleTaskCreate} />
        </div>

        {/* Right: Stats + Task list */}
        <div className="right-panel">
          <div className="stats">
            <span>Total: {tasks.length}</span>
            <span>Pending: {tasks.filter((t) => !t.completed).length}</span>
            <span>Completed: {tasks.filter((t) => t.completed).length}</span>
          </div>
          <TaskList
            tasks={tasks}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
