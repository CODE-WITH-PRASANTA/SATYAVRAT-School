import axios from "axios";

// Base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptors (future use for auth)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;

// 🔥 Image URL
export const IMAGE_URL = "http://localhost:5000";