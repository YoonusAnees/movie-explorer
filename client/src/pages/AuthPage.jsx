import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import signinImage from "../assets/signin.svg";
import registerImage from "../assets/register.svg";

import {
  Alert,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { authenticate, clearAuthError } from "../features/auth/authSlice";
import { MovieIcon, VisibilityIcon, VisibilityOffIcon } from "../components/common/Icons";


export default function AuthPage({ mode }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { user, loading, error: serverError } = useSelector(
    (state) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState("");

  const register = mode === "register";

  useEffect(() => {
    dispatch(clearAuthError());
    setPassword("");
    setValidation("");
    setUsername("");
  }, [dispatch, mode]);

  const from = location.state?.from;
  const destination =
    typeof from === "string" &&
      from.startsWith("/") &&
      !from.startsWith("//") &&
      !["/login", "/register"].includes(from)
      ? from
      : "/";

  if (user) return <Navigate to={destination} replace />;

  function submit(event) {
    event.preventDefault();

    if (!/^[a-zA-Z0-9_]{3,30}$/.test(username.trim())) {
      setValidation("Username: 3–30 letters, numbers or underscores.");
      return;
    }

    const passwordBytes = new TextEncoder().encode(password).length;
    if (password.length < 8 || password.length > 64 || passwordBytes > 72) {
      setValidation(
        "Password: 8–64 characters and no more than 72 UTF-8 bytes."
      );
      return;
    }

    setValidation("");
    dispatch(
      authenticate({
        mode,
        credentials: {
          username: username.trim().toLowerCase(),
          password,
        },
      })
    );
  }

  const displayError = validation || serverError;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "stretch",
        bgcolor: "background.default",
      }}
    >
      {/* Left panel: login or registration illustration */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          alignItems: "center",
          justifyContent: "center",
          width: {
            md: "42%",
            lg: "40%",
          },
          flexShrink: 0,
          overflow: "hidden",
          bgcolor: "background.default",
          p: {
            md: 4,
            lg: 5,
          },
        }}
      >
        <Box
          component="img"
          src={register ? registerImage : signinImage}
          alt={
            register
              ? "Movie Explorer registration illustration"
              : "Movie Explorer sign-in illustration"
          }
          sx={{
            display: "block",
            width: "100%",
            maxWidth: 460,
            height: "auto",
            maxHeight: "70vh",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* ── RIGHT PANEL: form ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, sm: 6, md: 7, lg: 10 },
          py: { xs: 6, md: 8 },
          bgcolor: "background.default",
        }}
      >
        {/* Mobile logo */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1.25,
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(79,70,229,0.35)",
            }}
          >
            <MovieIcon sx={{ color: "#fff", fontSize: 20 }} />
          </Box>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: 18,
              color: "text.primary",
              letterSpacing: "-0.02em",
            }}
          >
            Movie Explorer
          </Typography>
        </Box>

        <Box sx={{ width: "100%", maxWidth: 420 }}>
          {/* Heading */}
          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.65rem", sm: "2rem" },
              letterSpacing: "-0.03em",
              color: "text.primary",
              mb: 0.75,
            }}
          >
            {register ? "Create your account" : "Welcome back"}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.95rem",
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            {register
              ? "Save your favourite films and keep exploring."
              : "Sign in to your Movie Explorer account."}
          </Typography>

          {/* Error alert */}
          <Collapse in={!!displayError}>
            <Alert
              severity="error"
              variant="outlined"
              sx={{
                mb: 3,
                borderRadius: 2.5,
                fontSize: "0.87rem",
                alignItems: "flex-start",
              }}
              onClose={() => {
                setValidation("");
                dispatch(clearAuthError());
              }}
            >
              {displayError}
            </Alert>
          </Collapse>

          {/* Form */}
          <Stack
            component="form"
            onSubmit={submit}
            spacing={2.5}
            noValidate
          >
            <TextField
              id="auth-username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              autoFocus
              fullWidth
              inputProps={{ minLength: 3, maxLength: 30 }}
              InputLabelProps={{
                sx: {
                  "&.MuiInputLabel-shrink": {
                    transform: "translate(22px, -9px) scale(0.75)",
                  },
                },
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
            />

            <TextField
              id="auth-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={register ? "new-password" : "current-password"}
              fullWidth
              inputProps={{ minLength: 8, maxLength: 64 }}
              helperText="Minimum 8 characters."
              InputLabelProps={{
                sx: {
                  "&.MuiInputLabel-shrink": {
                    transform: "translate(18px, -9px) scale(0.75)",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                      size="small"
                      sx={{ color: "text.secondary" }}
                    >
                      {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
            />

            <Button
              id="auth-submit-btn"
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
              size="large"
              sx={{
                mt: 0.5,
                py: 1.5,
                borderRadius: 2.5,
                fontWeight: 700,
                fontSize: "0.97rem",
                letterSpacing: "0.01em",
                background: loading
                  ? undefined
                  : "linear-gradient(90deg, #4f46e5 0%, #6366f1 100%)",
                boxShadow: "0 4px 18px rgba(79,70,229,0.3)",
                "&:hover": {
                  boxShadow: "0 6px 24px rgba(79,70,229,0.45)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {loading
                ? "Please wait…"
                : register
                  ? "Create account"
                  : "Sign in"}
            </Button>
          </Stack>

          {/* Divider */}
          <Divider sx={{ my: 3, color: "text.disabled", fontSize: "0.8rem" }}>
            or
          </Divider>

          {/* Switch mode link */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{ color: "text.secondary", fontSize: "0.92rem", mb: 1 }}
            >
              {register
                ? "Already have an account?"
                : "Don't have an account?"}
            </Typography>
            <Button
              id="auth-switch-btn"
              component={Link}
              to={register ? "/login" : "/register"}
              state={location.state}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: 2.5,
                py: 1.25,
                fontWeight: 600,
                borderColor: isDark
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(0,0,0,0.12)",
                color: "primary.main",
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: isDark
                    ? "rgba(129,140,248,0.07)"
                    : "rgba(79,70,229,0.04)",
                },
              }}
            >
              {register ? "Sign in instead" : "Create a free account"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}