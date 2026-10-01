import axios from "axios";

const rawBaseUrl = (process.env.REACT_APP_API_URL || "/api/v1").trim();
const baseURL = rawBaseUrl.endsWith("/api/v1")
  ? rawBaseUrl
  : `${rawBaseUrl.replace(/\/+$/, "")}/api/v1`;

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 45000,
  headers: {
    "X-Requested-With": "MovieExplorer",
  },
});

export const apiError = (error) =>
  error.response?.data?.message ||
  "Cannot connect. Check your connection and try again.";

export default axiosClient;