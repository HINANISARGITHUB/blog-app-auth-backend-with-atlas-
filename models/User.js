import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // type and required is reserve word
    password: { type: String, required: true },
  },
  { timestamps: true },
); //timestamps is not a reserve word

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);  //bcrypt code li length 10 hogi
});

export default mongoose.model('User', userSchema);
