import { createTheme } from "@mui/material/styles";

export const createAppTheme = (mode) => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#818cf8" : "#4f46e5",
        light: isDark ? "#a5b4fc" : "#6366f1",
        dark: isDark ? "#4f46e5" : "#3730a3",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#f59e0b",
      },
      background: {
        default: isDark ? "#0b0f19" : "#f8fafc",
        paper: isDark ? "#111827" : "#ffffff",
      },
      text: {
        primary: isDark ? "#f3f4f6" : "#0f172a",
        secondary: isDark ? "#9ca3af" : "#64748b",
      },
      divider: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.07)",
      action: {
        hover: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
        selected: isDark ? "rgba(129, 140, 248, 0.12)" : "rgba(79, 70, 229, 0.08)",
      },
    },

    typography: {
      fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      h1: {
        fontWeight: 800,
        letterSpacing: "-0.03em",
      },
      h2: {
        fontWeight: 750,
        letterSpacing: "-0.025em",
      },
      h3: {
        fontWeight: 750,
        letterSpacing: "-0.02em",
      },
      h4: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h5: {
        fontWeight: 650,
        letterSpacing: "-0.015em",
      },
      h6: {
        fontWeight: 600,
        letterSpacing: "-0.01em",
      },
      subtitle1: {
        fontWeight: 600,
        letterSpacing: "-0.01em",
      },
      body1: {
        lineHeight: 1.6,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: isDark ? "#374151 transparent" : "#cbd5e1 transparent",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: 8,
              height: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: isDark ? "#374151" : "#cbd5e1",
              borderRadius: 4,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "rgba(11, 15, 25, 0.85)" : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
            boxShadow: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: "none",
            fontWeight: 600,
            padding: "8px 18px",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          contained: {
            boxShadow: isDark
              ? "0 4px 14px rgba(129, 140, 248, 0.25)"
              : "0 4px 14px rgba(79, 70, 229, 0.2)",
            "&:hover": {
              boxShadow: isDark
                ? "0 6px 20px rgba(129, 140, 248, 0.35)"
                : "0 6px 20px rgba(79, 70, 229, 0.3)",
              transform: "translateY(-1px)",
            },
          },
          outlined: {
            borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.12)",
            "&:hover": {
              borderColor: isDark ? "#818cf8" : "#4f46e5",
              backgroundColor: isDark ? "rgba(129, 140, 248, 0.08)" : "rgba(79, 70, 229, 0.04)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#111827" : "#ffffff",
            borderRadius: 16,
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.06)"}`,
            boxShadow: isDark
              ? "0 4px 20px rgba(0, 0, 0, 0.35)"
              : "0 4px 20px rgba(0, 0, 0, 0.04)",
            transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: isDark
                ? "0 12px 32px rgba(0, 0, 0, 0.5)"
                : "0 12px 32px rgba(0, 0, 0, 0.08)",
              borderColor: isDark ? "rgba(129, 140, 248, 0.3)" : "rgba(79, 70, 229, 0.2)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.06)"}`,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "rgba(129, 140, 248, 0.5)" : "rgba(79, 70, 229, 0.5)",
            },
          },
        },
      },
    },
  });
};