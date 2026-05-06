// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import connectDB from './config/db.js';
// import authRoutes from './routes/auth.js';

// const app = express();

// // Database Connection
// connectDB();

// // Universal CORS for Stability
// app.use(cors({

//   origin: function (origin, callback) {
   
//     callback(null, true);
//   },

 
//   origin: [
//     process.env.FRONTEND_URL, 
//      ''
//   ],

//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
// }));

// app.use(express.json());
// app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Backend is running successfully!");
// });

// // Routes
// app.use('/api/auth', authRoutes);

// // Root route for Vercel health check
// app.get('/', (req, res) => res.send('API is running...'));


// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }

// export default app;
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();

// Database Connection
connectDB();

// --- FIXED CORS SECTION ---
app.use(cors({
  // Direct URL dena sabse best hai CORS error hatane ke liye
  origin: "https://blog-app-auth-frontend-with-atlas.vercel.app", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(express.json());
app.use(cookieParser());

// Ek hi root route rakhein confusion se bachne ke liye
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Routes
app.use('/api/auth', authRoutes);

// Vercel deployment ke liye export zaroori hai
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;