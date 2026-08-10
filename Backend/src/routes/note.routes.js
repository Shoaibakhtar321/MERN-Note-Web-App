const express = require("express");
const noteController = require("../controllers/note.controller");

const noteRoute = express.Router();

noteRoute.post("/create-note", noteController.createNote);
noteRoute.get("/all-notes", noteController.getAllNotes);
noteRoute.get("/pinned-notes", noteController.getAllPinnedNotes);
noteRoute.get("/archived-notes", noteController.getAllArchivedNotes);
noteRoute.get("/search-note/", noteController.getNoteBySearch);
noteRoute.get("/note/:id", noteController.getNoteByID);
noteRoute.patch("/note/:id", noteController.updateNoteByID);
noteRoute.delete("/note/:id", noteController.deleteNoteByID);
noteRoute.patch("/note/pin/:id", noteController.togglePinByID);
noteRoute.patch("/note/archive/:id", noteController.toggleArchiveByID); 

module.exports = noteRoute;
