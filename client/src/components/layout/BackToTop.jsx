import { useEffect, useState } from "react";
import { Fab, Tooltip, Zoom } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

const SCROLL_THRESHOLD = 300;

/**
 * Floating back-to-top button.
 *
 * - Appears after scrolling past SCROLL_THRESHOLD px.
 * - Respects prefers-reduced-motion.
 * - Positioned above MobileBottomNav on small screens (bottom: 76px xs/sm,
 *   bottom: 24px md+).
 * - Cleans up the scroll listener on unmount.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount in case page is already scrolled.
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function handleClick() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <Zoom in={visible} timeout={250} unmountOnExit>
      <Tooltip title="Back to top" placement="left">
        <Fab
          aria-label="Back to top"
          size="small"
          onClick={handleClick}
          sx={{
            position: "fixed",
            // Above MobileBottomNav (60px) + safe-area + 8px gap on mobile;
            // plain 24px gap on desktop.
            bottom: {
              xs: "calc(60px + env(safe-area-inset-bottom, 0px) + 12px)",
              md: 24,
            },
            right: { xs: 16, md: 24 },
            zIndex: 1250,
            bgcolor: "background.paper",
            color: "text.primary",
            border: 1,
            borderColor: "divider",
            boxShadow: (t) =>
              t.palette.mode === "dark"
                ? "0 4px 16px rgba(0,0,0,0.5)"
                : "0 4px 16px rgba(0,0,0,0.12)",
            "&:hover": {
              bgcolor: "primary.main",
              color: "#fff",
              borderColor: "primary.main",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(79,70,229,0.35)",
            },
            transition:
              "background-color 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s",
          }}
        >
          <ArrowUpwardRoundedIcon fontSize="small" />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
