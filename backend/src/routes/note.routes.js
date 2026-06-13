const express = require("express");

const {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
  searchNotes
} = require("../controllers/note.controller");

const router = express.Router();

router.get("/", getAllNotes);

router.get("/search", searchNotes);

router.get("/:id", getSingleNote);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

module.exports = router;