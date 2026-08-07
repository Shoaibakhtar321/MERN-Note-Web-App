const express = require("express");
const cors = require("cors");
const Note = require("./models/note.model");
const app = express();
app.use(express.json());
app.use(cors());

/* Create Note */
app.post("/create", async (req, res) => {
  try {
    const note = await Note.create(req.body);

    res.status(201).json({ 
      success: true,
      data: note,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/* Get All Notes */
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      success: true,
      notes,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/* Get all Pinned notes */
app.get("/notes/pinned", async (req, res) => {
  try {
    const pinnedNotes = await Note.find({ isPinned: true });
    res.status(200).json({
      success: true,
      count: pinnedNotes.length,
      data: pinnedNotes,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/* Get all archieved Notes */
app.get("/notes/archived", async (req, res) => {
  try {
    const archiveNote = await Note.find({ isArchived: true });
    res.status(200).json({
      success: true,
      count: archiveNote.length,
      data: archiveNote,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/* Get note through search */
app.get("/notes/search", async (req, res) => {
  try {
    const { title } = req.query;
    const search = title.trim();

    console.log(search);

    const note = await Note.find({
      title: { $regex: search, $options: "i" },
    });

    if (!search) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note found successfully",
      note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* Get Note By ID */
app.get("/notes/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  try {
    if (!note) {
      return res.status(400).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      note,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/* Update Note By ID */
app.patch("/notes/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      note: updatedNote,
    });

    if (!updatedNote) {
      return res.status(400).json({
        success: false,
        message: "Note not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/* Delete Note By ID */
app.delete("/notes/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      res.status(400).json({
        sucess: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      deletedNote: deletedNote,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/* Pin or Unpin Note By ID */
app.patch("/notes/:id/pin", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    note.isPinned = !note.isPinned;
    await note.save();
    res.status(200).json({
      success: true,
      message: note.isPinned
        ? "Note pinned successfully"
        : "Note unpinned successfully",
      data: note,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/* Archive or Unarchive Note By ID */
app.patch("/notes/:id/archive", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    note.isArchived = !note.isArchived;
    await note.save();

    res.status(200).json({
      success: true,
      message: note.isArchived
        ? "Note is archived successfully"
        : "Note is unachived successfully",
      data: note,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = app;
