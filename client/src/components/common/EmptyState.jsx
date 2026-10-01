import {
  Paper,
  Typography,
} from "@mui/material";

export default function EmptyState({
  title = "No movies found",
  message = "Try another search or adjust your filters.",
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 5,
        my: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h6">
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        {message}
      </Typography>
    </Paper>
  );
}