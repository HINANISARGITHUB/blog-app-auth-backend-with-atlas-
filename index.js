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

// 🔗 DB connect
connectDB();

// 🔐 CORS (production safe)


app.use(cors({
  origin: process.env.FRONTEND_URL, // Ensure this is "https://blog-app-auth-frontend.vercel.app"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 📦 middlewares
app.use(express.json());
app.use(cookieParser());

// 🛣️ routes
app.use("/api/auth", authRoutes);

// ❤️ test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🚀 server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});