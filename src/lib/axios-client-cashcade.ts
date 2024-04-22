import axios from "axios";
const http = axios.create({
  baseURL: import.meta.env.VITE_CASHCADE_API_URL,
  headers: { Authorization: `Bearer ${import.meta.env.VITE_CASHCADE_API_KEY}` },
});
export default http;
