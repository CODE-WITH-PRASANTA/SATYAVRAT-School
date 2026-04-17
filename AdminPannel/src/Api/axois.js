import axios from "axios";

export const BASE_URL = "http://localhost:5000";
export const IMAGE_URL = `${BASE_URL}/uploads/`;

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export default API;