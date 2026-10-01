import { createSlice } from "@reduxjs/toolkit";
import {
  readStorage,
  favoriteKey,
  AUTH_USER_KEY,
} from "../../utils/storage";

const cachedUser = readStorage(AUTH_USER_KEY, null);
const initialOwner = cachedUser?.id || null;
const initialSaved = initialOwner
  ? readStorage(favoriteKey(initialOwner), [])
  : [];
const initialItems = Array.isArray(initialSaved)
  ? initialSaved.filter(
      (movie) =>
        movie &&
        Number.isInteger(movie.id) &&
        typeof movie.title === "string"
    )
  : [];

const favoritesSlice = createSlice({
  name: "favorites",

  initialState: {
    owner: initialOwner,
    items: initialItems,
  },

  reducers: {
    loadFavorites(state, action) {
      state.owner = action.payload.owner;
      state.items = action.payload.items;
    },

    setFavoritesOwner(state, action) {
      state.owner = action.payload;
    },

    toggleFavorite(state, action) {
      const movie = action.payload.movie || action.payload;
      const owner = action.payload.owner || state.owner;

      if (owner && !state.owner) {
        state.owner = owner;
      }

      if (!state.owner) return;

      const index = state.items.findIndex(
        (m) => m.id === movie.id
      );

      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(movie);
      }
    },
  },
});

export const {
  loadFavorites,
  setFavoritesOwner,
  toggleFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;