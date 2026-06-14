const Note = require("../models/note.model");
const asyncHandler = require("../utils/asyncHandler");

const getAllNotes = async (req, res) => {
  try {
    const search = req.query.search || "";

    const notes = await Note.find({
      $or: [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          content: {
            $regex: search,
            $options: "i"
          }
        }
      ]
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes"
    });
  }
};

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
  const { title, content, tags, pinned } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title is required"
    });
  }

  const note = await Note.create({
    title,
    content,
    tags,
    pinned
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
  
  if (title !== undefined && !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title is required"
    });
  }
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

module.exports = {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
  
};