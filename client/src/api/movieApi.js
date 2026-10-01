import api from "./axiosClient";

export const movieApi = {
  list: (mode, params, signal) =>
    api.get(`/movies/${mode}`, {
      params,
      signal,
    }),

  details: (id, signal) =>
    api.get(`/movies/${id}`, { signal }),

  genres: (signal) =>
    api.get("/movies/genres", { signal }),
};