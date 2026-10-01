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
    signOut.fulfilled
  ),

  effect: (_, api) => {
    const owner =
      api.getState().auth.user?.id || null;

    const saved = owner
      ? readStorage(favoriteKey(owner), [])
      : [];

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
  },
});

persistence.startListening({
  actionCreator: toggleFavorite,

  effect: (_, api) => {
    const { owner, items } =
      api.getState().favorites;

    if (owner) {
      writeStorage(favoriteKey(owner), items);
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