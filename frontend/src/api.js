import axios from "axios";

console.log("LOG: VITE_API_URL is:", import.meta.env.VITE_API_URL);

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
});

export default API;