import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",

  initialState: {
    owner: null,
    items: [],
  },

  reducers: {
    loadFavorites(state, action) {
      state.owner = action.payload.owner;
      state.items = action.payload.items;
    },

    toggleFavorite(state, action) {
      if (!state.owner) return;

      const index = state.items.findIndex(
        (movie) => movie.id === action.payload.id
      );

      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const {
  loadFavorites,
  toggleFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;