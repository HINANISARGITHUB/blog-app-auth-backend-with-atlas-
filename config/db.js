import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    // Vercel par process.exit(1) ki jagah error throw karna behtar hai
    throw new Error("Database connection failed");
  }
};

export default connectDB;

