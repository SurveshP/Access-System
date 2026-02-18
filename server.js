import express from "express";
import mongoose from "mongoose";
import roleRoutes from "./routes/role.route.js";
import userRoutes from "./routes/user.route.js";
import session from "express-session";

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "mysupersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true
    }
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/accessSytem")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
