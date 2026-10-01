import { useEffect } from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { fetchDetails } from "../features/movies/moviesSlice";

import {
  imageUrl,
  releaseYear,
} from "../utils/movieHelpers";

import FavoriteButton from "../components/movies/FavoriteButton";
import CastList from "../components/movies/CastList";
import TrailerPlayer from "../components/movies/TrailerPlayer";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const {
    details: movie,
    detailsLoading,
    detailsError,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    const request = dispatch(
      fetchDetails(movieId)
    );

    return () => request.abort();
  }, [dispatch, movieId]);

  if (detailsLoading) {
    return (
      <LoadingState label="Loading movie details..." />
    );
  }

  if (detailsError) {
    return (
      <ErrorState
        message={detailsError}
        onRetry={() =>
          dispatch(fetchDetails(movieId))
        }
      />
    );
  }

  if (
    !movie ||
    String(movie.id) !== movieId
  ) {
    return <LoadingState />;
  }

  return (
    <>
      <Button
        component={Link}
        to="/"
        sx={{ mb: 3 }}
      >
        Back to discovery
      </Button>

      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={4}
      >
        {movie.poster_path && (
          <Box
            component="img"
            src={imageUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
            sx={{
              width: {
                xs: "100%",
                md: 300,
              },
              maxWidth: 360,
              borderRadius: 3,
              alignSelf: "flex-start",
            }}
          />
        )}

        <Box sx={{ flex: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Typography
              component="h1"
              variant="h4"
            >
              {movie.title}
            </Typography>

            <FavoriteButton movie={movie} />
          </Stack>

          <Typography
            color="text.secondary"
            sx={{ my: 2 }}
          >
            {releaseYear(movie.release_date)}
            {" · "}

            {movie.runtime
              ? `${movie.runtime} minutes · `
              : ""}

            ★{" "}
            {Number(
              movie.vote_average || 0
            ).toFixed(1)}
            {" / 10"}
          </Typography>

          <Stack
            direction="row"
            useFlexGap
            flexWrap="wrap"
            spacing={1}
          >
            {movie.genres?.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
              />
            ))}
          </Stack>

          {movie.tagline && (
            <Typography
              sx={{
                mt: 3,
                fontStyle: "italic",
              }}
            >
              {movie.tagline}
            </Typography>
          )}

          <Typography
            variant="h6"
            sx={{ mt: 3 }}
          >
            Overview
          </Typography>

          <Typography
            sx={{
              mt: 1,
              lineHeight: 1.8,
            }}
          >
            {movie.overview ||
              "No overview is available."}
          </Typography>
        </Box>
      </Stack>

      <CastList cast={movie.credits?.cast} />

      <TrailerPlayer
        videos={movie.videos?.results}
      />
    </>
  );
}