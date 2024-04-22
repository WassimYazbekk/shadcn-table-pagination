import axios from "axios";
const http = axios.create({
  baseURL: import.meta.env.VITE_ALGORIVEX_API_URL,
  withCredentials: true,
  withXSRFToken: true,
});
export default http;
