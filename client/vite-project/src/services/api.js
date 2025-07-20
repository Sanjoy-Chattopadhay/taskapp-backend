import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth header to all requests if user is logged in
api.interceptors.request.use((config) => {
  const userEmail = localStorage.getItem("userEmail");
  if (userEmail) {
    config.headers["user-email"] = userEmail;
  }
  return config;
});

export const authAPI = {
  register: (email, password) =>
    api.post("/auth/register", { email, password }),
  login: (email, password) => api.post("/auth/login", { email, password }),
};

export const taskAPI = {
  getAllTasks: () => api.get("/tasks"),
  getTaskById: (id) => api.get(`/tasks/${id}`),
  createTask: (task) => api.post("/tasks", task),
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};
