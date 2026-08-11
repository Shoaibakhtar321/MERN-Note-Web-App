import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./features/getAllNotesSlice";
import createNoteReducer from "./features/createNoteSlice";

export const store = configureStore({
  reducer: {
    allNotes: notesReducer,
    createNote: createNoteReducer,
  },
});
