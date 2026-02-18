import express from "express";

import { createUser, getUsers, loginUser, logoutUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/addUser", createUser);
router.get("/", getUsers);
router.post("/loginUser", loginUser);
router.get("/logoutUser", logoutUser);

export default router