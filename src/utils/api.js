// frontend/src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace this if your backend is running on a different port
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
