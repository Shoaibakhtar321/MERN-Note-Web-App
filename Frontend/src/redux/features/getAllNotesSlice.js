import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotes } from "../../api/notesApi";

export const getAllNotes = createAsyncThunk(
  "/notes/getNotes",
  async (__, { rejectWithValue }) => {
    try {
      const data = await getNotes();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notes",
      );
    }
  },
);

const initialState = { notes: [], loading: false, error: null };

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.notes;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default notesSlice.reducer;
