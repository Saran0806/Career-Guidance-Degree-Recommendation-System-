import axios from "axios";

const API = axios.create({
  baseURL: "https://691d5dc9d58e64bf0d35eb8a.mockapi.io/create",
});

// fake hash (demo purpose)
export const hashPassword = (password) => btoa(password);

// GET all users
export const getUsers = () => API.get("/users");

// POST new user
export const registerUser = (data) => API.post("/users", data);

