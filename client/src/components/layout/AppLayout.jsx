import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Alert,
  Box,
  Container,
} from "@mui/material";

import { clearAuthError } from "../../features/auth/authSlice";

import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import BackToTop from "./BackToTop";
import ScrollToTop from "./ScrollToTop";

export default function AppLayout() {
  const dispatch = useDispatch();
  const location = useLocation();

  const error = useSelector(
    (state) => state.auth.error
  );

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch, location.pathname]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Resets scroll to top on every route change */}
      <ScrollToTop />

      <Navbar />

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          pt: {
            xs: 2.5,
            md: 4,
          },
          pb: {
            xs: 10,
            md: 6,
          },
          flexGrow: 1,
        }}
      >
        {error && (
          <Alert
            severity="error"
            variant="filled"
            sx={{
              mb: 3,
              borderRadius: 2.5,
              fontWeight: 500,
            }}
            onClose={() =>
              dispatch(clearAuthError())
            }
          >
            {error}
          </Alert>
        )}

        <Outlet />
      </Container>

      <Footer />
      <MobileBottomNav />

      {/* Global floating back-to-top button */}
      <BackToTop />
    </Box>
  );
}