import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  DarkModeIcon,
  LightModeIcon,
  MovieIcon,
  PersonIcon,
} from "../common/Icons";

import { toggleTheme } from "../../features/theme/themeSlice";
import { signOut } from "../../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const mode = useSelector((state) => state.theme.mode);

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            gap: { xs: 1, sm: 2 },
            minHeight: { xs: 58, md: 70 },
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                width: { xs: 32, sm: 38 },
                height: { xs: 32, sm: 38 },
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: (t) =>
                  t.palette.mode === "dark"
                    ? "#0F172A"
                    : "#0F172A",
                color: "#ffffff",
              }}
            >
              <MovieIcon sx={{ fontSize: { xs: 17, sm: 20 } }} />
            </Box>

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: 16,
                  sm: 21,
                },
                letterSpacing: "-0.025em",
                color: "text.primary",
                whiteSpace: "nowrap",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              Movie Explorer
            </Typography>
          </Box>

          {/* Desktop Navigation Links */}
          <Box
            component="nav"
            aria-label="Desktop navigation"
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button
              component={NavLink}
              to="/"
              sx={{
                color: "text.secondary",
                "&.active": {
                  color: "primary.main",
                  bgcolor: "action.selected",
                },
              }}
            >
              Discover
            </Button>

            <Button
              component={NavLink}
              to="/favorites"
              sx={{
                color: "text.secondary",
                "&.active": {
                  color: "primary.main",
                  bgcolor: "action.selected",
                },
              }}
            >
              Favorites
            </Button>
          </Box>

          {/* User Status and Theme Toggle - Shown on BOTH Mobile and Desktop */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.75, sm: 1.5 },
            }}
          >
            {/* Desktop Full Sign Out Button / Mobile User Chip */}
            {user ? (
              <>
                {/* Desktop view button */}
                <Button
                  disabled={loading}
                  onClick={logout}
                  variant="outlined"
                  size="small"
                  sx={{
                    display: { xs: "none", sm: "inline-flex" },
                    fontSize: "0.82rem",
                  }}
                >
                  Sign out ({user.username})
                </Button>

                {/* Mobile view user badge */}
                <Chip
                  icon={<PersonIcon sx={{ fontSize: "1rem !important" }} />}
                  label={user.username}
                  size="small"
                  variant="outlined"
                  onClick={logout}
                  title="Click to sign out"
                  sx={{
                    display: { xs: "inline-flex", sm: "none" },
                    maxWidth: 110,
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    bgcolor: "action.selected",
                  }}
                />
              </>
            ) : (
              <Button
                variant="contained"
                component={NavLink}
                to="/login"
                size="small"
                sx={{
                  py: { xs: "4px", sm: "6px" },
                  px: { xs: 1.5, sm: 2 },
                  fontSize: { xs: "0.78rem", sm: "0.85rem" },
                }}
              >
                Sign in
              </Button>
            )}

            {/* Theme Toggle (Dark/Light) */}
            <IconButton
              aria-label={`Switch to ${mode === "dark" ? "light" : "dark"
                } mode`}
              onClick={() => dispatch(toggleTheme())}
              size="small"
              sx={{
                p: { xs: 0.75, sm: 1 },
                bgcolor: "action.hover",
              }}
            >
              {mode === "dark" ? (
                <LightModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              ) : (
                <DarkModeIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}