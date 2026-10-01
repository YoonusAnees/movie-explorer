import {
  Box,
  Button,
} from "@mui/material";

export default function LoadMoreButton({
  loading,
  onClick,
}) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 4,
      }}
    >
      <Button
        variant="outlined"
        disabled={loading}
        onClick={onClick}
      >
        {loading
          ? "Loading..."
          : "Load more movies"}
      </Button>
    </Box>
  );
}