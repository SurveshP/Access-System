import express from "express";

import { createRole, getRoles } from "../controllers/role.controller.js";

const router = express.Router();

router.post("/addRole", createRole);
router.get("/", getRoles);

export default router