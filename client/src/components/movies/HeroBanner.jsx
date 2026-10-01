import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { imageUrl, releaseYear } from "../../utils/movieHelpers";
import {
  ExpandMoreIcon,
  PlayArrowIcon,
  StarIcon,
  WhatshotIcon,
} from "../common/Icons";

export default function HeroBanner({ movie, genres = [], onExploreClick }) {
  if (!movie) {
    return (
      <Box
        sx={{
          position: "relative",
          borderRadius: { xs: 3, md: 4 },
          overflow: "hidden",
          mb: { xs: 3, md: 5 },
          minHeight: { xs: 260, md: 360 },
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
          color: "#ffffff",
          p: { xs: 3, sm: 5, md: 6 },
        }}
      >
        <Stack spacing={2} sx={{ maxWidth: 640 }}>
          <Chip
            label="Trending Movies & Series"
            size="small"
            sx={{
              alignSelf: "flex-start",
              bgcolor: "rgba(245, 158, 11, 0.15)",
              color: "#fbbf24",
              fontWeight: 700,
              fontSize: "0.75rem",
              border: "1px solid rgba(245, 158, 11, 0.3)",
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 850,
              fontSize: { xs: "1.75rem", sm: "2.4rem", md: "3rem" },
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Find Your Next Favorite Film
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: { xs: "0.92rem", md: "1.05rem" },
              lineHeight: 1.6,
            }}
          >
            Explore top trending releases, discover hidden gems by genre, and save the films you love.
          </Typography>
        </Stack>
      </Box>
    );
  }

  const backdrop = imageUrl(movie.backdrop_path, "original") || imageUrl(movie.poster_path, "w780");
  const movieGenres = (movie.genre_ids || [])
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .slice(0, 3);

  const rating = typeof movie.vote_average === "number" ? movie.vote_average.toFixed(1) : null;
  const year = releaseYear(movie.release_date);

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: { xs: 3, md: 4 },
        overflow: "hidden",
        mb: { xs: 3, md: 5 },
        minHeight: { xs: 380, sm: 440, md: 500 },
        display: "flex",
        alignItems: "flex-end",
        bgcolor: "#0b0f19",
        color: "#ffffff",
        boxShadow: "0 12px 36px -4px rgba(0,0,0,0.45)",
      }}
    >
      {/* Background Poster / Backdrop Image */}
      {backdrop && (
        <Box
          component="img"
          src={backdrop}
          alt={movie.title || "Featured movie"}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
            transform: "scale(1.02)",
            filter: "brightness(0.95)",
            transition: "transform 0.6s ease",
          }}
        />
      )}

      {/* Cinematic Multi-Stop Gradient Overlays */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: {
            xs: "linear-gradient(to top, rgba(11, 15, 25, 0.98) 0%, rgba(11, 15, 25, 0.85) 50%, rgba(11, 15, 25, 0.4) 100%)",
            md: "linear-gradient(to right, rgba(11, 15, 25, 0.97) 0%, rgba(11, 15, 25, 0.88) 42%, rgba(11, 15, 25, 0.4) 75%, rgba(11, 15, 25, 0.25) 100%), linear-gradient(to top, rgba(11, 15, 25, 0.95) 0%, transparent 60%)",
          },
        }}
      />

      {/* Hero Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          p: { xs: 3, sm: 4.5, md: 6 },
        }}
      >
        <Stack spacing={2} sx={{ maxWidth: { xs: "100%", md: 660 } }}>
          {/* Top Spotlight Tag */}
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexWrap: "wrap", gap: 1 }}>
            <Chip
              icon={<WhatshotIcon sx={{ color: "#f59e0b !important", fontSize: 16 }} />}
              label="Trending Spotlight"
              size="small"
              sx={{
                bgcolor: "rgba(245, 158, 11, 0.2)",
                color: "#fbbf24",
                fontWeight: 750,
                fontSize: "0.75rem",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                backdropFilter: "blur(8px)",
              }}
            />

            {rating && (
              <Chip
                icon={<StarIcon sx={{ color: "#facc15 !important", fontSize: 15 }} />}
                label={rating}
                size="small"
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.45)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(8px)",
                }}
              />
            )}

            {year && year !== "Unknown year" && (
              <Chip
                label={year}
                size="small"
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.45)",
                  color: "rgba(255, 255, 255, 0.85)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              />
            )}

            {movieGenres.map((name) => (
              <Chip
                key={name}
                label={name}
                size="small"
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                  color: "rgba(255, 255, 255, 0.85)",
                  fontSize: "0.72rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              />
            ))}
          </Stack>

          {/* Movie Title */}
          <Typography
            component="h1"
            sx={{
              fontWeight: 850,
              fontSize: { xs: "1.75rem", sm: "2.35rem", md: "3.15rem" },
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              textShadow: "0 2px 14px rgba(0, 0, 0, 0.6)",
            }}
          >
            {movie.title}
          </Typography>

          {/* Movie Overview */}
          {movie.overview && (
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.82)",
                fontSize: { xs: "0.88rem", sm: "0.96rem", md: "1.02rem" },
                lineHeight: 1.6,
                display: "-webkit-box",
                WebkitLineClamp: { xs: 2, sm: 3 },
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 620,
              }}
            >
              {movie.overview}
            </Typography>
          )}

          {/* Action CTAs */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.75}
            sx={{ pt: 1, alignItems: { xs: "stretch", sm: "center" } }}
          >
            <Button
              component={Link}
              to={`/movies/${movie.id}`}
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              sx={{
                borderRadius: 2.5,
                py: { xs: 1.2, sm: 1.35 },
                px: 3,
                fontWeight: 750,
                fontSize: "0.92rem",
                background: "linear-gradient(90deg, #4f46e5 0%, #6366f1 100%)",
                boxShadow: "0 6px 20px rgba(79, 70, 229, 0.45)",
                color: "#ffffff",
                "&:hover": {
                  background: "linear-gradient(90deg, #4338ca 0%, #4f46e5 100%)",
                  boxShadow: "0 8px 24px rgba(79, 70, 229, 0.6)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Watch Trailer & Details
            </Button>

            {onExploreClick && (
              <Button
                variant="outlined"
                size="large"
                endIcon={<ExpandMoreIcon />}
                onClick={onExploreClick}
                sx={{
                  borderRadius: 2.5,
                  py: { xs: 1.2, sm: 1.35 },
                  px: 2.5,
                  fontWeight: 650,
                  fontSize: "0.9rem",
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.25)",
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(6px)",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    bgcolor: "rgba(255, 255, 255, 0.12)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Browse & Filter Movies
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
