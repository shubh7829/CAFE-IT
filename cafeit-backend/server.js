import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import axios from "axios";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use("/api", userRoutes);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("CAFE'IT backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if(token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;