import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE_URL}/notes`;

export const getNotes = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Error fetching notes' };
  }
};

export const addNote = async (note) => {
  try {
    const res = await axios.post(API_URL, note);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: 'Error adding note' };
  }
};

export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (err) {
    throw err.response?.data || { message: 'Error deleting note' };
  }
};