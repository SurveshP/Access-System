import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import documentRoutes from "./routes/document.route.js";
import session from "express-session";

const app = express();

// Parse JSON
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set true if using HTTPS
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  })
);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/accessSystem")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/documents", documentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
