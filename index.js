// import 'dotenv/config';
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/auth.js";
// const app = express();
// connectDB();
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
// app.use(express.json());
// app.use(cookieParser());
// app.use("/api/auth", authRoutes);
// app.get("/", (req, res) => res.send("API is running..."));
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import 'dotenv/config';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

const app = express();

// Database Connection
connectDB();

// --- CHANGES START HERE ---

// 1. CORS Configuration: Array use karein takay local aur production dono chalein
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  "http://localhost:5173",
  "https://blog-app-auth-frontend.vercel.app" // Vite ka default local port
];

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy block: This origin is not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// --- CHANGES END HERE ---

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));