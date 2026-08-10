const NoteModel = require("../models/note.model");

async function createNote(req, res) {
  try {
    const { title, description } = req.body;

    const note = await NoteModel.create({ title, description });

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
}

async function getAllNotes(req, res) {
  try {
    const notes = await NoteModel.find();

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
}

async function getAllPinnedNotes(req, res) {
  try {
    const pinnedNotes = await NoteModel.find({ isPinned: true });
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
}

async function getAllArchivedNotes(req, res) {
  try {
    const archiveNote = await NoteModel.find({ isArchived: true });
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
}

async function getNoteBySearch(req, res) {
  try {
    const { title } = req.query;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search title is required",
      });
    }

    const search = title.trim();

    const note = await NoteModel.find({
      title: { $regex: search, $options: "i" },
    });

    if (note.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No notes found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notes found successfully",
      note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getNoteByID(req, res) {
  try {
    const { id } = req.params;

    const note = await NoteModel.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      note,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateNoteByID(req, res) {
  try {
    const updatedNote = await NoteModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
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
}

async function deleteNoteByID(req, res) {
  try {
    const deletedNote = await NoteModel.findByIdAndDelete(req.params.id);
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
}

async function togglePinByID(req, res) {
  try {
    const note = await NoteModel.findById(req.params.id);
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
}

async function toggleArchiveByID(req, res) {
  try {
    const note = await NoteModel.findById(req.params.id);
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
}

module.exports = {
  createNote,
  getAllNotes,
  getAllPinnedNotes,
  getAllArchivedNotes,
  getNoteBySearch,
  getNoteByID,
  updateNoteByID,
  deleteNoteByID,
  togglePinByID,
  toggleArchiveByID,
};
