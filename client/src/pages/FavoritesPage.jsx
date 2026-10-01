import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

import MovieGrid from "../components/movies/MovieGrid";
import EmptyState from "../components/common/EmptyState";

export default function FavoritesPage() {
  const items = useSelector(
    (state) => state.favorites.items
  );

  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        sx={{ mb: 1 }}
      >
        Your favorites
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Saved on this browser for your account.
      </Typography>

      {items.length > 0 ? (
        <MovieGrid movies={items} />
      ) : (
        <EmptyState
          title="Your list is empty"
          message="Tap the heart on a movie to save it here."
        />
      )}
    </>
  );
}