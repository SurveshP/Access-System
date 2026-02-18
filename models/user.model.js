// models/user.model.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "manager", "employee"],
    required: true
  }
});

// Hash password before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // async hook, no next needed
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);
