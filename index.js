import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();

// Database Connection
connectDB();

// Universal CORS for Stability
app.use(cors({

  origin: function (origin, callback) {
    // Sab origins allow kar diye taake deployment mein masla na aaye
    callback(null, true);
  },

  // Multiple origins allowed (ENV variable + Hardcoded for safety)
  origin: [
    process.env.FRONTEND_URL, 
     ''
  ],

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Root route for Vercel health check
app.get('/', (req, res) => res.send('API is running...'));


if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// VERCEL KE LIYE YE LAZMI HAI
export default app;
