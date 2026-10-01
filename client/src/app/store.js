import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";

import auth, {
  authenticate,
  restoreSession,
  signOut,
} from "../features/auth/authSlice";

import movies, {
  setQuery,
} from "../features/movies/moviesSlice";

import favorites, {
  loadFavorites,
  toggleFavorite,
} from "../features/favorites/favoritesSlice";

import theme, {
  toggleTheme,
} from "../features/theme/themeSlice";

import {
  readStorage,
  writeStorage,
  favoriteKey,
} from "../utils/storage";

const persistence = createListenerMiddleware();

persistence.startListening({
  matcher: isAnyOf(
    authenticate.fulfilled,
    restoreSession.fulfilled,
    signOut.fulfilled,
    restoreSession.rejected
  ),

  effect: (action, api) => {
    if (
      action.type === signOut.fulfilled.type ||
      (action.type === restoreSession.rejected.type && action.payload?.status === 401)
    ) {
      api.dispatch(
        loadFavorites({
          owner: null,
          items: [],
        })
      );
      return;
    }

    const owner =
      api.getState().auth.user?.id || null;

    if (owner) {
      const saved = readStorage(favoriteKey(owner), []);

      const items = Array.isArray(saved)
        ? saved.filter(
            (movie) =>
              movie &&
              Number.isInteger(movie.id) &&
              typeof movie.title === "string"
          )
        : [];

      api.dispatch(
        loadFavorites({
          owner,
          items,
        })
      );
    }
  },
});

persistence.startListening({
  actionCreator: toggleFavorite,

  effect: (_, api) => {
    const { owner, items } =
      api.getState().favorites;
    const currentOwner =
      owner || api.getState().auth.user?.id || null;

    if (currentOwner) {
      writeStorage(favoriteKey(currentOwner), items);
    }
  },
});

persistence.startListening({
  actionCreator: toggleTheme,

  effect: (_, api) => {
    writeStorage(
      "movieExplorer:theme",
      api.getState().theme.mode
    );
  },
});

persistence.startListening({
  actionCreator: setQuery,

  effect: (_, api) => {
    writeStorage(
      "movieExplorer:lastSearch",
      api.getState().movies.query
    );
  },
});

export const store = configureStore({
  reducer: {
    auth,
    movies,
    favorites,
    theme,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      persistence.middleware
    ),
});