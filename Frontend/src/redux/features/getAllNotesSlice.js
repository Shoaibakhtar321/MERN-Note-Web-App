import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createNoteApi,
  deleteNote,
  getNotes,
  pinNote,
} from "../../api/notesApi";

export const get_notes = createAsyncThunk("notes/getNotes", async () => {
  const response = await getNotes();
  return response.notes;
});

export const create_note = createAsyncThunk(
  "notes/createNote",
  async (note, ThunkAPI) => {
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

export const delete_note = createAsyncThunk(
  "notes/deleteNote",
  async (id, ThunkAPI) => {
    try {
      const response = await deleteNote(id);
      return response;
    } catch (error) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || "Faild to delete note...",
      );
    }
  },
);

export const pin_note = createAsyncThunk(
  "note/pinNote",
  async (id, ThunkAPI) => {
    try {
      const response = await pinNote(id);
      return response;
    } catch (error) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to pin note...",
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
    createLoading: false,
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
      .addCase(create_note.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(create_note.fulfilled, (state, action) => {
        state.createLoading = false;
        state.notes.unshift(action.payload);
      })
      .addCase(delete_note.fulfilled, (state, action) => {
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload.deletedNote._id,
        );
      })
      .addCase(pin_note.fulfilled, (state, action) => {
        const updatedNote = action.payload;

        const index = state.notes.findIndex(
          (note) => note._id == updatedNote.data._id,
        );
        state.notes[index] = updatedNote.data;
      });
  },
});

export default getNotesSlice.reducer;
