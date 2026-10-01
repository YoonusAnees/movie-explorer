import { Box } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(3, minmax(0, 1fr))",
          md: "repeat(4, minmax(0, 1fr))",
          lg: "repeat(5, minmax(0, 1fr))",
        },
        gap: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
        width: "100%",
        my: 2,
        "@media (max-width: 360px)": {
          gridTemplateColumns: "1fr",
        },
      }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </Box>
  );
}