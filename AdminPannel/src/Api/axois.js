
import axios from "axios";

export const BASE_URL = "http://localhost:5000";

// ✅ FIXED (must include /uploads/)
export const IMAGE_URL = `${BASE_URL}/uploads/`;

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default API;