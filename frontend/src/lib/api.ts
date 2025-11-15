import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 backend API base
  headers: {"Content-Type": "application/json",
  },
});

// ✅ Attach token automatically if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // we saved this on login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
