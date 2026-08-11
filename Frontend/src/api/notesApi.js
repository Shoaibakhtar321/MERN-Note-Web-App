import axios from "axios";

const API_KEY = "http://localhost:3000/api";

export const getNotes = async () => {
  const response = await axios.get(`${API_KEY}/all-notes`);

  return response.data;
};

export const createNoteApi = async (title, description) => {
  const response = await axios.post(`${API_KEY}/create-note`, {
    title,
    description,
  });
  return response.data;
};
