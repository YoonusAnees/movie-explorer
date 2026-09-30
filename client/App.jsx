import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import { restoreSession } from "./features/auth/authSlice";
import { createAppTheme } from "./theme/createAppTheme";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const dispatch = useDispatch();

  const mode = useSelector(
    (state) => state.theme.mode
  );

  const theme = useMemo(
    () => createAppTheme(mode),
    [mode]
  );

  useEffect(() => {
    const request = dispatch(restoreSession());

    return () => request.abort();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}