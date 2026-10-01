import api from "./axiosClient";

export const authApi = {
  me: (signal) =>
    api.get("/auth/me", { signal }),

  login: (body) =>
    api.post("/auth/login", body),

  register: (body) =>
    api.post("/auth/register", body),

  logout: () =>
    api.post("/auth/logout"),
};