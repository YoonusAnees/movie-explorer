import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import {
  fetchGenres,
  fetchMovies,
  setFilters,
  setQuery,
} from "../features/movies/moviesSlice";

import SearchBar from "../components/movies/SearchBar";
import MovieFilters from "../components/movies/MovieFilters";
import MovieGrid from "../components/movies/MovieGrid";
import HeroBanner from "../components/movies/HeroBanner";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import LoadMoreButton from "../components/common/LoadMoreButton";

import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function HomePage() {
  const dispatch = useDispatch();

  const {
    query,
    filters,
    items,
    genres,
    loading,
    error,
    page,
    totalPages,
  } = useSelector((state) => state.movies);

  const [autoLoad, setAutoLoad] = useState(true);

  useEffect(() => {
    const request = dispatch(fetchGenres());

    return () => request.abort();
  }, [dispatch]);

  useEffect(() => {
    const request = dispatch(
      fetchMovies({ page: 1 })
    );

    return () => request.abort();
  }, [dispatch, query, filters]);

  const loadMore = useCallback(() => {
    if (!loading && page < totalPages) {
      dispatch(
        fetchMovies({
          page: page + 1,
        })
      );
    }
  }, [
    dispatch,
    loading,
    page,
    totalPages,
  ]);

  const sentinel = useInfiniteScroll({
    enabled:
      Boolean(query) && autoLoad && !error,

    loading,
    hasMore: page < totalPages,
    onLoadMore: loadMore,
  });

  const visibleMovies = query
    ? items.filter(
      (movie) =>
        (!filters.genre ||
          movie.genre_ids?.includes(
            Number(filters.genre)
          )) &&
        (!filters.rating ||
          movie.vote_average >=
          Number(filters.rating))
    )
    : items;

  const filtered =
    filters.genre ||
    filters.year ||
    filters.rating;

  const title = query
    ? `Results for “${query}”`
    : filtered
      ? "Discover movies"
      : "Trending this week";

  function retry() {
    dispatch(
      fetchMovies({
        page: page === 0 ? 1 : page + 1,
      })
    );
  }

  const scrollToExplore = () => {
    document.getElementById("explore-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Featured Landing Hero Banner */}
      {!query && (
        <HeroBanner
          movie={items[0]}
          genres={genres}
          onExploreClick={scrollToExplore}
        />
      )}

      {/* Explore & Filters Section */}
      <Box id="explore-section">
        <SearchBar
          query={query}
          onSearch={(value) =>
            dispatch(setQuery(value))
          }
        />

        <MovieFilters
          filters={filters}
          genres={genres}
          onChange={(value) =>
            dispatch(setFilters(value))
          }
        />
      </Box>

      {query && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ mb: 2.5, flexWrap: "wrap", gap: 1 }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => dispatch(setQuery(""))}
          >
            Clear search
          </Button>

          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={autoLoad}
                onChange={(event) =>
                  setAutoLoad(event.target.checked)
                }
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                Auto-load as you scroll
              </Typography>
            }
          />
        </Stack>
      )}

      {query && (filters.genre || filters.rating) && (
        <Box sx={{ mb: 2 }}>
          <Chip
            size="small"
            label="Genre & rating filters apply to loaded results"
            variant="outlined"
            sx={{ color: "text.secondary" }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 2.5,
          mt: 1.5,
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          sx={{
            fontWeight: 750,
            letterSpacing: "-0.02em",
            fontSize: { xs: "1.2rem", md: "1.45rem" },
          }}
        >
          {title}
        </Typography>

        {visibleMovies.length > 0 && (
          <Chip
            size="small"
            label={`${visibleMovies.length} movies`}
            sx={{
              height: 22,
              fontSize: "0.75rem",
              fontWeight: 600,
              bgcolor: "action.selected",
              color: "primary.main",
              border: "none",
            }}
          />
        )}
      </Box>

      {error && (
        <ErrorState
          message={error}
          onRetry={retry}
        />
      )}

      {visibleMovies.length > 0 && (
        <MovieGrid movies={visibleMovies} />
      )}

      {loading && (
        <LoadingState label="Loading movies..." />
      )}

      {!loading &&
        !error &&
        visibleMovies.length === 0 && (
          <EmptyState
            message={
              page < totalPages
                ? "No matches on the loaded pages. Load more or adjust your filters."
                : "Try another search or adjust your filters."
            }
          />
        )}

      {page < totalPages && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <LoadMoreButton
            loading={loading}
            onClick={loadMore}
          />
        </Box>
      )}

      <Box
        ref={sentinel}
        aria-hidden="true"
        sx={{ height: 1 }}
      />
    </Box>
  );
}