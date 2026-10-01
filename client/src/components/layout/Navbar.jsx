import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  DarkModeIcon,
  LightModeIcon,
  MovieIcon,
  LogoutIcon,
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
            {/* User Greeting and Logout Button */}
            {user ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, sm: 1.5 },
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: "0.82rem", sm: "0.9rem" },
                    color: "text.secondary",
                    fontWeight: 500,
                    maxWidth: { xs: 120, sm: 200, md: 260 },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Hello,&nbsp;
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.username}
                  </Box>
                </Typography>

                <Button
                  disabled={loading}
                  onClick={logout}
                  variant="outlined"
                  size="small"
                  startIcon={<LogoutIcon sx={{ fontSize: "0.95rem !important" }} />}
                  sx={{
                    display: { xs: "none", sm: "inline-flex" },
                    borderColor: "divider",
                    color: "text.secondary",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: { xs: "0.75rem", sm: "0.82rem" },
                    px: { xs: 1, sm: 1.5 },
                    py: { xs: 0.35, sm: 0.5 },
                    minWidth: "auto",
                    "&:hover": {
                      borderColor: "error.main",
                      color: "error.main",
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
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