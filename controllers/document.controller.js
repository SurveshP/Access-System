import Document from "../models/document.model.js";

// CREATE DOCUMENT
export const createDocument = async (req, res) => {
  try {
    const doc = await Document.create({
      title: req.body.title,
      content: req.body.content,
      owner: req.session.user.id
    });

    res.status(201).json({ message: "Document created", doc });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET DOCUMENTS
export const getDocuments = async (req, res) => {
  try {
    let docs;

    switch (req.session.user.role) {
      case "admin":
        docs = await Document.find().populate("owner", "emailAddress role");
        break;
      case "manager":
        docs = await Document.find().populate("owner", "emailAddress role");
        break;
      case "employee":
        docs = await Document.find({ owner: req.session.user.id });
        break;
      default:
        return res.status(403).json({ message: "Invalid role" });
    }

    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE DOCUMENT
export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    const userRole = req.session.user.role;
    const userId = req.session.user.id;

    // Admin can delete any document
    if (userRole === "admin") {
      await doc.deleteOne();
      return res.json({ message: "Deleted by admin" });
    }

    // Manager can delete only employee documents
    if (userRole === "manager") {
      const docOwner = await doc.populate("owner", "role");
      if (docOwner.owner.role !== "admin" && docOwner.owner.role !== "manager") {
        await doc.deleteOne();
        return res.json({ message: "Deleted by manager" });
      } else {
        return res.status(403).json({ message: "Managers cannot delete this document" });
      }
    }

    // Employee can delete only own documents
    if (userRole === "employee") {
      if (doc.owner.toString() === userId) {
        await doc.deleteOne();
        return res.json({ message: "Deleted successfully" });
      }
      return res.status(403).json({ message: "You cannot delete this document" });
    }

    res.status(403).json({ message: "Unauthorized action" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
