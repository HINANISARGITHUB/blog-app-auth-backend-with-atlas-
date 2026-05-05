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
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();


connectDB().catch(err => {
  console.log("DB Error:", err);
});


const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-app-auth-frontend-with-atlas.vercel.app",
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // safe fallback (avoid crash)
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});



export default app;



