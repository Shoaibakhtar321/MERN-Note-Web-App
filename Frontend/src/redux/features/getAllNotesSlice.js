import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  archiveNote,
  createNoteApi,
  deleteNote,
  getArchivedNotes,
  getNotes,
  getPinnedNotes,
  pinNote,
  searchNote,
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

export const archive_note = createAsyncThunk(
  "note/archive",
  async (id, ThunkAPI) => {
    try {
      const response = await archiveNote(id);
      return response;
    } catch (error) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to archive note...",
      );
    }
  },
);

export const get_pinned_notes = createAsyncThunk("notes/pinned", async () => {
  const response = await getPinnedNotes();
  return response.data;
});

export const get_archived_notes = createAsyncThunk(
  "notes/archived",
  async () => {
    const response = await getArchivedNotes();
    return response.data;
  },
);

export const search_note = createAsyncThunk(
  "note/search-note",
  async (title, ThunkAPI) => {
    try {
      const response = await searchNote(title);
      return response.note;
    } catch (error) {
      return ThunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load note...",
      );
    }
  },
);

const getNotesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    pinnedNotes: [],
    archivedNotes: [],
    loading: false,
    error: null,
    createLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* GET ALL NOTES */
      .addCase(get_notes.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_notes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(get_notes.rejected, (state) => {
        state.error = "Something went wrong";
        state.loading = false;
      })
      /* CREATE NOTE */
      .addCase(create_note.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(create_note.fulfilled, (state, action) => {
        state.createLoading = false;
        state.notes.unshift(action.payload);
      })
      /* DELETE NOTE */
      .addCase(delete_note.fulfilled, (state, action) => {
        const noteId = action.payload.deletedNote._id;

        state.notes = state.notes.filter((note) => note._id !== noteId);

        state.pinnedNotes = state.pinnedNotes.filter(
          (note) => note._id !== noteId,
        );
        state.archivedNotes = state.archivedNotes.filter(
          (note) => note._id !== noteId,
        );
      })
      /* PIN NOTE */
      .addCase(pin_note.fulfilled, (state, action) => {
        const updatedNote = action.payload.data;

        const index = state.notes.findIndex(
          (note) => note._id === updatedNote._id,
        );

        if (index !== -1) {
          state.notes[index] = updatedNote;
        }

        const archivedIndex = state.archivedNotes.findIndex(
          (note) => note._id === updatedNote._id,
        );

        if (archivedIndex !== -1) {
          state.archivedNotes[archivedIndex] = updatedNote;
        }

        if (!updatedNote.isPinned) {
          state.pinnedNotes = state.pinnedNotes.filter(
            (note) => note._id !== updatedNote._id,
          );
        }
      })
      /* ARCHIVE NOTE */
      .addCase(archive_note.fulfilled, (state, action) => {
        const updatedNote = action.payload.data;
        const index = state.notes.findIndex(
          (note) => note._id === updatedNote._id,
        );
        const pinnedIndex = state.pinnedNotes.findIndex(
          (note) => note._id === updatedNote._id,
        );
        if (index !== -1) {
          state.notes[index] = updatedNote;
        }
        if (pinnedIndex !== -1) {
          state.pinnedNotes[pinnedIndex] = updatedNote;
        }
        if (!updatedNote.isArchived) {
          state.archivedNotes = state.archivedNotes.filter(
            (note) => note._id !== updatedNote._id,
          );
        }
      })
      /* GET ALL PINNED NOTE */
      .addCase(get_pinned_notes.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_pinned_notes.fulfilled, (state, action) => {
        state.pinnedNotes = action.payload;
        state.loading = false;
      })
      .addCase(get_pinned_notes.rejected, (state, action) => {
        state.error = action.payload;
      })
      /* GET ALL ARCHIVED NOTES */
      .addCase(get_archived_notes.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_archived_notes.fulfilled, (state, action) => {
        state.loading = false;
        state.archivedNotes = action.payload;
      })
      .addCase(get_archived_notes.rejected, (state) => {
        state.error = "Something went wrong...";
      })
      .addCase(search_note.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.error = null;
      })
      .addCase(search_note.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default getNotesSlice.reducer;
