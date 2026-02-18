import express from "express";
import { createUser, getUsers, loginUser, logoutUser } from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// Wrap all async controllers with asyncHandler
router.post("/addUser", asyncHandler(createUser));
router.get("/", asyncHandler(getUsers));
router.post("/loginUser", asyncHandler(loginUser));
router.get("/logoutUser", asyncHandler(logoutUser));

export default router;
