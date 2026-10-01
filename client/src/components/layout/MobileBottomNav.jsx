import { useLocation, useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";

import {
  MovieIcon,
  FavoriteIcon,
  SearchIcon,
} from "../common/Icons";

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTab = () => {
    if (location.pathname === "/") return "discover";
    if (location.pathname.startsWith("/favorites")) return "favorites";
    return "";
  };

  const handleTabChange = (event, newValue) => {
    if (newValue === "discover") {
      navigate("/");
    } else if (newValue === "favorites") {
      navigate("/favorites");
    } else if (newValue === "search") {
      navigate("/");
      // Smooth scroll to top search input
      window.scrollTo({ top: 0, behavior: "smooth" });
      const searchInput = document.querySelector('input[type="text"]');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 200);
      }
    }
  };

  return (
    <Paper
      elevation={8}
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        borderRadius: 0,
        borderTop: 1,
        borderColor: "divider",
        bgcolor: (t) =>
          t.palette.mode === "dark"
            ? "rgba(11, 15, 25, 0.92)"
            : "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        pb: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <BottomNavigation
        value={getActiveTab()}
        onChange={handleTabChange}
        showLabels
        sx={{
          bgcolor: "transparent",
          height: 60,
          "& .MuiBottomNavigationAction-root": {
            minWidth: 0,
            py: 0.75,
            color: "text.secondary",
            "&.Mui-selected": {
              color: "primary.main",
              fontWeight: 700,
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "0.75rem",
              fontWeight: 600,
              mt: 0.25,
            },
          },
        }}
      >
        <BottomNavigationAction
          label="Discover"
          value="discover"
          icon={<MovieIcon sx={{ fontSize: 22 }} />}
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchIcon sx={{ fontSize: 22 }} />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon sx={{ fontSize: 22 }} />}
        />
      </BottomNavigation>
    </Paper>
  );
}
