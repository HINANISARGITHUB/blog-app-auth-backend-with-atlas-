import mongoose from "mongoose";

const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB ERROR:", error.message);
  }
};

export default connectDB;

 try {
 const conn = await mongoose.connect(process.env.MONGO_URI);
 console.log(`MongoDB connected: ${conn.connection.host}`);
 } catch (err) {
 console.error(`Error: ${err.message}`);
 process.exit(1);
 }

export default connectDB;

