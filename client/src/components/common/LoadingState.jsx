import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function LoadingState({
  label = "Loading...",
}) {
  return (
    <Box
      role="status"
      sx={{
        py: 6,
        textAlign: "center",
      }}
    >
      <CircularProgress />

      <Typography sx={{ mt: 2 }}>
        {label}
      </Typography>
    </Box>
  );
}