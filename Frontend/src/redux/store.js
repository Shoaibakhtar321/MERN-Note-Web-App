import { configureStore } from "@reduxjs/toolkit";
import getNotesReducer from "../redux/features/getAllNotesSlice";
// import getPinnedNotesReducer from "../redux/features/pinnedNotesSlice";

export const store = configureStore({
  reducer: {
    notesReducer: getNotesReducer,
    // pinnedReducer: getPinnedNotesReducer,
  },
});
