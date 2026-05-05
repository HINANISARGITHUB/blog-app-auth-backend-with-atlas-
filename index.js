// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import connectDB from './config/db.js';
// import authRoutes from './routes/auth.js';

// const app = express();

// // Database Connection
// connectDB();

// // Updated CORS Configuration
// app.use(cors({
//   // Multiple origins allowed (ENV variable + Hardcoded for safety)
//   origin: [
//     process.env.FRONTEND_URL, 
//     'https://blog-app-auth-frontend-with-atlas.vercel.app'
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use('/api/auth', authRoutes);

// // Root route for Vercel health check
// app.get('/', (req, res) => res.send('API is running...'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// export default app;

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db.js';
import authRoutes from './auth.js';

const app = express();

// Database connection startup
connectDB();

// Middleware
app.use(cors({
  origin: ["https://blog-app-auth-frontend-with-atlas.vercel.app", process.env.FRONTEND_URL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('API is running perfectly...');
});

// Catch-all route for undefined paths to avoid 404/403 crashes
app.all('*', (req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

export default app;