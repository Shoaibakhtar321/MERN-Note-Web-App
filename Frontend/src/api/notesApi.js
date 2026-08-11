import axios from "axios";

export const getNotes = async () => {
  const API_KEY = "http://localhost:3000/api";

  const response = await axios.get(`${API_KEY}/all-notes`);

  return response.data;
};
