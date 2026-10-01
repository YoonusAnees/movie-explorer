import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { movieApi } from "../../api/movieApi";
import { apiError } from "../../api/axiosClient";
import { readStorage } from "../../utils/storage";

const savedQuery = readStorage(
  "movieExplorer:lastSearch",
  ""
);

export function getListRequest(state, page) {
  const { query, filters } = state;
  const params = { page };

  if (query) {
    params.query = query;

    if (filters.year) {
      params.year = filters.year;
    }

    return {
      mode: "search",
      params,
    };
  }

  if (
    filters.genre ||
    filters.year ||
    filters.rating
  ) {
    if (filters.genre) params.genre = filters.genre;
    if (filters.year) params.year = filters.year;
    if (filters.rating) params.rating = filters.rating;

    return {
      mode: "discover",
      params,
    };
  }

  return {
    mode: "trending",
    params,
  };
}

export const fetchMovies = createAsyncThunk(
  "movies/fetch",

  async (
    { page = 1 },
    { getState, signal, rejectWithValue }
  ) => {
    const request = getListRequest(
      getState().movies,
      page
    );

    try {
      const response = await movieApi.list(
        request.mode,
        request.params,
        signal
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(apiError(error));
    }
  },

  {
    condition: ({ page = 1 }, { getState }) =>
      page === 1 || !getState().movies.loading,
  }
);

const DEFAULT_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const fetchGenres = createAsyncThunk(
  "movies/genres",
  async (_, { signal }) => {
    try {
      const response = await movieApi.genres(signal);
      return response.data.data?.length ? response.data.data : DEFAULT_GENRES;
    } catch {
      return DEFAULT_GENRES;
    }
  }
);

export const fetchDetails = createAsyncThunk(
  "movies/details",
  async (id, { signal, rejectWithValue }) => {
    try {
      const response = await movieApi.details(
        id,
        signal
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(apiError(error));
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",

  initialState: {
    query:
      typeof savedQuery === "string" ? savedQuery : "",

    filters: {
      genre: "",
      year: "",
      rating: "",
    },

    items: [],
    page: 0,
    totalPages: 0,
    loading: false,
    error: null,
    listRequestId: null,

    genres: DEFAULT_GENRES,
    genresError: null,

    details: null,
    detailsLoading: false,
    detailsError: null,
    detailsRequestId: null,
  },

  reducers: {
    setQuery(state, action) {
      state.query = action.payload.trim();
      state.items = [];
      state.page = 0;
      state.totalPages = 0;
      state.listRequestId = null;
      state.error = null;
    },

    setFilters(state, action) {
      state.filters = action.payload;
      state.items = [];
      state.page = 0;
      state.totalPages = 0;
      state.listRequestId = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.listRequestId = action.meta.requestId;

        if (action.meta.arg.page === 1) {
          state.items = [];
          state.page = 0;
          state.totalPages = 0;
        }
      })

      .addCase(
        fetchMovies.fulfilled,
        (state, action) => {
          if (
            state.listRequestId !== action.meta.requestId
          ) {
            return;
          }

          state.loading = false;

          const combined =
            action.meta.arg.page === 1
              ? action.payload.results
              : [
                  ...state.items,
                  ...action.payload.results,
                ];

          // A movie can occur on more than one page.
          state.items = Array.from(
            new Map(
              combined.map((movie) => [
                movie.id,
                movie,
              ])
            ).values()
          );

          state.page = action.payload.page;
          state.totalPages = action.payload.total_pages;
        }
      )

      .addCase(
        fetchMovies.rejected,
        (state, action) => {
          if (
            state.listRequestId !== action.meta.requestId
          ) {
            return;
          }

          state.loading = false;

          state.error = action.meta.aborted
            ? null
            : action.payload || "Unable to load movies.";
        }
      )

      .addCase(
        fetchGenres.fulfilled,
        (state, action) => {
          state.genres = action.payload || DEFAULT_GENRES;
          state.genresError = null;
        }
      )

      .addCase(
        fetchGenres.rejected,
        (state) => {
          if (!state.genres || !state.genres.length) {
            state.genres = DEFAULT_GENRES;
          }
          state.genresError = null;
        }
      )

      .addCase(
        fetchDetails.pending,
        (state, action) => {
          state.details = null;
          state.detailsLoading = true;
          state.detailsError = null;
          state.detailsRequestId = action.meta.requestId;
        }
      )

      .addCase(
        fetchDetails.fulfilled,
        (state, action) => {
          if (
            state.detailsRequestId !==
            action.meta.requestId
          ) {
            return;
          }

          state.details = action.payload;
          state.detailsLoading = false;
        }
      )

      .addCase(
        fetchDetails.rejected,
        (state, action) => {
          if (
            state.detailsRequestId !==
            action.meta.requestId
          ) {
            return;
          }

          state.detailsLoading = false;

          state.detailsError = action.meta.aborted
            ? null
            : action.payload || "Unable to load movie.";
        }
      );
  },
});

export const { setQuery, setFilters } =
  moviesSlice.actions;

export default moviesSlice.reducer;