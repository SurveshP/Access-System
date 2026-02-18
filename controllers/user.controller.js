import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// CREATE USER
export const createUser = async (req, res) => {
  console.log("Request body:", req.body);

  try {
    const user = await User.create(req.body);
    console.log("Created user:", user);
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("Error creating user:", err);  // ← Important for debugging
    res.status(400).json({ error: err.message });
  }
};


// GET USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude password
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers, users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    const user = await User.findOne({ emailAddress });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    req.session.user = { id: user._id, role: user.role, email: user.emailAddress };
    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGOUT
export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  });
};
