import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getNotes = async (search = "") => {
  const response = await API.get(`/notes?search=${search}`);
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await API.post("/notes", noteData);
  return response.data;
};

export const updateNote = async (id, noteData) => {
  const response = await API.put(`/notes/${id}`,noteData);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await API.delete(`/notes/${id}`);
  return response.data;
};

export const searchNotes = async (query) => {
  const response = await API.get(`/notes/search?q=${query}`);
  return response.data;
};
