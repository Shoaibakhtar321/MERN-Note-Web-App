import axios from "axios";

const API_KEY = "http://localhost:3000/api";

export const getNotes = async () => {
  const response = await axios.get(`${API_KEY}/all-notes`);
  return response.data;
};

export const createNoteApi = async (note) => {
  const response = await axios.post(`${API_KEY}/create-note`, note);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_KEY}/note/${id}`);
  return response.data;
};

export const pinNote = async (id) => {
  const response = await axios.patch(`${API_KEY}/note/pin/${id}`);
  return response.data;
};

export const archiveNote = async (id) => {
  const response = await axios.patch(`${API_KEY}/note/archive/${id}`);
  return response.data;
};

// GETTING ALL PINNED NOTES
export const getPinnedNotes = async () => {
  const response = await axios.get(`${API_KEY}/pinned-notes`);
  return response.data;
};
