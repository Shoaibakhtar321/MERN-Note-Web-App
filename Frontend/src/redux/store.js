import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./features/getAllNotesSlice";

export const store = configureStore({
  reducer: {
    allNotes: notesReducer,
  },
});
