import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "/api/v1",

  withCredentials: true,
  timeout: 15000,

  headers: {
    "X-Requested-With": "MovieExplorer",
  },
});

export const apiError = (error) =>
  error.response?.data?.message ||
  "Cannot connect. Check your connection and try again.";

export default axiosClient;