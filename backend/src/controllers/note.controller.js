const Note = require("../models/note.model");
const asyncHandler = require("../utils/asyncHandler");

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().sort({
    pinned: -1,
    updatedAt: -1
  });

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  });
});

const getSingleNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found"
    });
  }

  res.status(200).json({
    success: true,
    data: note
  });
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title is required"
    });
  }

  const note = await Note.create({
    title,
    content,
    tags
  });

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    data: note
  });
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, tags, pinned } = req.body;

  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found"
    });
  }

  note.title = title ?? note.title;
  note.content = content ?? note.content;
  note.tags = tags ?? note.tags;
  note.pinned = pinned ?? note.pinned;

  await note.save();

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    data: note
  });
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found"
    });
  }

  await note.deleteOne();

  res.status(200).json({
    success: true,
    message: "Note deleted successfully"
  });
});

const searchNotes = asyncHandler(async (req, res) => {
  const query = req.query.q || "";

  const notes = await Note.find({
    $or: [
      {
        title: {
          $regex: query,
          $options: "i"
        }
      },
      {
        content: {
          $regex: query,
          $options: "i"
        }
      },
      {
        tags: {
          $regex: query,
          $options: "i"
        }
      }
    ]
  }).sort({
    pinned: -1,
    updatedAt: -1
  });

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  });
});

module.exports = {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
  searchNotes
};