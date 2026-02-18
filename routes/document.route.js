import express from "express";
import { requireLogin } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import { createDocument, getDocuments, deleteDocument } from "../controllers/document.controller.js";

const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const router = express.Router();

// Create document - only authenticated users
router.post("/", requireLogin, allowRoles("admin", "manager", "employee"), asyncHandler(createDocument));

// Get documents - only authenticated users
router.get("/", requireLogin, getDocuments);

// Delete document - rules handled in controller
router.delete("/:id", requireLogin, deleteDocument);

export default router;
