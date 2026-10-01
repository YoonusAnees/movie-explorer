import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";

import MovieGrid from "../components/movies/MovieGrid";
import EmptyState from "../components/common/EmptyState";
import { MovieIcon } from "../components/common/Icons";

/* ─── Favorites hero banner ─────────────────────────────────────── */
function FavoritesHero({ count }) {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: { xs: 3, md: 4 },
        overflow: "hidden",
        mb: { xs: 4, md: 6 },
        minHeight: { xs: 220, md: 300 },
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        color: "#ffffff",
        p: { xs: 3, sm: 5, md: 6 },
      }}
    >
      {/* Decorative blurred circles */}
      <Box
        sx={{
          position: "absolute",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "rgba(239,68,68,0.18)",
          filter: "blur(90px)",
          top: -80,
          right: -60,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(129,140,248,0.15)",
          filter: "blur(70px)",
          bottom: -60,
          left: "30%",
          pointerEvents: "none",
        }}
      />

      <Stack spacing={2} sx={{ maxWidth: 640, position: "relative", zIndex: 1 }}>

        {/* Heading */}
        <Typography
          component="h1"
          sx={{
            fontWeight: 850,
            fontSize: { xs: "1.7rem", sm: "2.3rem", md: "2.9rem" },
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          Movies You&nbsp;
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg,#f87171,#fb923c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Love
          </Box>
        </Typography>

        {/* Sub-text */}
        <Typography
          sx={{
            color: "rgba(255,255,255,0.72)",
            fontSize: { xs: "0.9rem", md: "1rem" },
            lineHeight: 1.6,
          }}
        >
          {count > 0
            ? `You have saved ${count} movie${count !== 1 ? "s" : ""} to your list. Pick up where you left off.`
            : "Heart any movie to save it here — your private watchlist, always ready."}
        </Typography>

        {/* CTA row */}
        {count === 0 && (
          <Stack direction="row" spacing={1.5} flexWrap="wrap">
            <Button
              component={Link}
              to="/"
              variant="contained"
              size="medium"
              startIcon={<MovieIcon fontSize="small" />}
              sx={{
                borderRadius: 2.5,
                fontWeight: 700,
                background: "linear-gradient(90deg,#ef4444,#f97316)",
                boxShadow: "0 4px 18px rgba(239,68,68,0.35)",
                "&:hover": {
                  boxShadow: "0 6px 24px rgba(239,68,68,0.5)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              Browse Movies
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function FavoritesPage() {
  const items = useSelector((state) => state.favorites.items);

  return (
    <>
      <FavoritesHero count={items.length} />

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