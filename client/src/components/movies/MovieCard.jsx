import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import FavoriteButton from "./FavoriteButton";

import {
  imageUrl,
  releaseYear,
} from "../../utils/movieHelpers";

export default function MovieCard({ movie }) {
  const [broken, setBroken] = useState(false);
  const poster = imageUrl(movie.poster_path);
  const rating = Number(movie.vote_average || 0).toFixed(1);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardActionArea
          component={Link}
          to={`/movies/${movie.id}`}
          sx={{ display: "block" }}
        >
          {poster && !broken ? (
            <Box
              component="img"
              src={poster}
              alt={`${movie.title} poster`}
              loading="lazy"
              onError={() => setBroken(true)}
              sx={{
                width: "100%",
                aspectRatio: "2 / 3",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "scale(1.04)",
                },
              }}
            />
          ) : (
            <Box
              sx={{
                aspectRatio: "2 / 3",
                display: "grid",
                placeItems: "center",
                bgcolor: "action.hover",
                p: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
              >
                No poster available
              </Typography>
            </Box>
          )}
        </CardActionArea>

        {/* Floating Rating Badge */}
        {Number(rating) > 0 && (
          <Chip
            size="small"
            label={`★ ${rating}`}
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: "rgba(17, 24, 39, 0.8)",
              backdropFilter: "blur(8px)",
              color: "#f59e0b",
              fontWeight: 700,
              fontSize: "0.75rem",
              height: 24,
              border: "1px solid rgba(255, 255, 255, 0.12)",
              pointerEvents: "none",
            }}
          />
        )}
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          p: 2,
          pb: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          component={Link}
          to={`/movies/${movie.id}`}
          sx={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Typography
            component="h3"
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              fontSize: "0.95rem",
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            {movie.title}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              mt: 0.5,
              fontWeight: 500,
            }}
          >
            {releaseYear(movie.release_date) || "Unknown Year"}
          </Typography>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mt: 1, pt: 0.5 }}
        >
          <FavoriteButton movie={movie} />
        </Stack>
      </CardContent>
    </Card>
  );
}