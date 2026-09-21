import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createNoteApi, getNotes } from "../../api/notesApi";

export const get_notes = createAsyncThunk("notes/getNotes", async () => {
  const response = await getNotes();
  return response.notes;
});

export const create_note = createAsyncThunk(
  "notes/createNote",
  async (note, ThunkAPI) => {
    console.log(note);
    try {
      const response = await createNoteApi(note);
      return response.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create note...",
      );
    }
  },
);

const getNotesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_notes.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_notes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.loading = false;
      })
      .addCase(get_notes.rejected, (state) => {
        state.error = "Something went wrong";
        state.loading = false;
      })
      .addCase(create_note.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      });
  },
});

export default getNotesSlice.reducer;
