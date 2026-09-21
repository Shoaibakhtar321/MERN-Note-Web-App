import { configureStore } from "@reduxjs/toolkit";
import getNotesReducer from "../redux/features/getAllNotesSlice";

export const store = configureStore({
  reducer: {
    notesReducer: getNotesReducer,
  },
});
