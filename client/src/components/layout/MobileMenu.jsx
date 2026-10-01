import {
  Box,
  Button,
  Collapse,
  Stack,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import { LogoutIcon } from "../common/Icons";

export default function MobileMenu({
  open,
  onClose,
  user,
  onLogout,
  loading,
}) {
  return (
    <Collapse
      in={open}
      id="mobile-navigation"
    >
      <Box
        component="nav"
        aria-label="Mobile navigation"
        sx={{
          px: 2,
          pb: 2,
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <Stack spacing={1}>
          <Button
            component={NavLink}
            to="/"
            onClick={onClose}
          >
            Discover
          </Button>

          <Button
            component={NavLink}
            to="/favorites"
            onClick={onClose}
          >
            Favorites
          </Button>

          {user ? (
            <Button
              disabled={loading}
              onClick={onLogout}
              startIcon={<LogoutIcon />}
              color="error"
              variant="outlined"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Logout
            </Button>
          ) : (
            <Button
              component={NavLink}
              to="/login"
              onClick={onClose}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Sign in
            </Button>
          )}
        </Stack>
      </Box>
    </Collapse>
  );
}