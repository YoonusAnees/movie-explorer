import { useRef } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../common/Icons";

import { imageUrl } from "../../utils/movieHelpers";

export default function CastList({ cast = [] }) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth > 400 ? 360 : 260;
    const target =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };

  if (!cast || cast.length === 0) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" fontWeight={750} sx={{ mb: 1 }}>
          Top Cast
        </Typography>
        <Typography color="text.secondary">
          Cast information is unavailable.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 4 }}>
      {/* Title */}
      <Typography
        variant="h5"
        fontWeight={750}
        letterSpacing="-0.02em"
        sx={{ mb: 2 }}
      >
        Top Cast
      </Typography>

      {/* Carousel Wrapper */}
      <Box sx={{ position: "relative", width: "100%" }}>
        {/* Left Scroll Button - Always clickable & responsive */}
        <IconButton
          onClick={() => handleScroll("left")}
          aria-label="Scroll cast left"
          sx={{
            position: "absolute",
            left: { xs: 0, sm: -14 },
            top: "44%",
            transform: "translateY(-50%)",
            zIndex: 20,
            width: 42,
            height: 42,
            bgcolor: (t) =>
              t.palette.mode === "dark"
                ? "rgba(17, 24, 39, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            border: 1,
            borderColor: "divider",
            boxShadow: (t) =>
              t.palette.mode === "dark"
                ? "0 4px 16px rgba(0, 0, 0, 0.6)"
                : "0 4px 16px rgba(0, 0, 0, 0.15)",
            color: "text.primary",
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: "primary.main",
              color: "#ffffff",
              transform: "translateY(-50%) scale(1.1)",
            },
            "&:active": {
              transform: "translateY(-50%) scale(0.95)",
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* Right Scroll Button - Always clickable & responsive */}
        <IconButton
          onClick={() => handleScroll("right")}
          aria-label="Scroll cast right"
          sx={{
            position: "absolute",
            right: { xs: 0, sm: -14 },
            top: "44%",
            transform: "translateY(-50%)",
            zIndex: 20,
            width: 42,
            height: 42,
            bgcolor: (t) =>
              t.palette.mode === "dark"
                ? "rgba(17, 24, 39, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            border: 1,
            borderColor: "divider",
            boxShadow: (t) =>
              t.palette.mode === "dark"
                ? "0 4px 16px rgba(0, 0, 0, 0.6)"
                : "0 4px 16px rgba(0, 0, 0, 0.15)",
            color: "text.primary",
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: "primary.main",
              color: "#ffffff",
              transform: "translateY(-50%) scale(1.1)",
            },
            "&:active": {
              transform: "translateY(-50%) scale(0.95)",
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>

        {/* Cast Cards Horizontal Container */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 2.5,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            py: 1,
            px: { xs: 1.5, sm: 2 },
          }}
        >
          {cast.slice(0, 20).map((person, index) => {
            const profile = imageUrl(person.profile_path, "w185");

            return (
              <Box
                key={`${person.id}-${index}`}
                sx={{
                  minWidth: 120,
                  width: 120,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Avatar
                  src={profile || undefined}
                  alt={person.name}
                  sx={{
                    width: 86,
                    height: 86,
                    mb: 1.25,
                    boxShadow: (t) =>
                      t.palette.mode === "dark"
                        ? "0 4px 14px rgba(0, 0, 0, 0.4)"
                        : "0 4px 14px rgba(0, 0, 0, 0.08)",
                    border: 2,
                    borderColor: "divider",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    bgcolor: "action.selected",
                    color: "primary.main",
                  }}
                >
                  {person.name?.[0]}
                </Avatar>

                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{
                    lineHeight: 1.3,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {person.name}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                    lineHeight: 1.2,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {person.character || "Cast"}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}