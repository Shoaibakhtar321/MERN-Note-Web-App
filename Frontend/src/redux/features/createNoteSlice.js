import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNoteApi } from "../../api/notesApi";

export const createNote = createAsyncThunk(
  "/create-note",
  async ({ title, description }, { rejectWithValue }) => {
    try {
      const data = await createNoteApi(title, description);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Note can not create",
      );
    }
  },
);

const initialState = {
  note: null,
  loading: false,
  error: null,
};

// Slice
const createNoteSlice = createSlice({
  name: "createNote",
  initialState,
  reducers: {
    clearCreateNoteError: (state) => {
      state.error = null;
    },

    clearCreatedNote: (state) => {
      state.note = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Creating note
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Note created successfully
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.note = action.payload;
        state.error = null;
      })

      // Creating note failed
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {
  clearCreateNoteError,
  clearCreatedNote,
} = createNoteSlice.actions;

export default createNoteSlice.reducer;