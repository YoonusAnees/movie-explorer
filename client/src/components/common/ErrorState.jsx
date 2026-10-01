import {
  Alert,
  Button,
} from "@mui/material";

export default function ErrorState({
  message,
  onRetry,
}) {
  return (
    <Alert
      severity="error"
      sx={{ my: 2 }}
      action={
        onRetry ? (
          <Button
            color="inherit"
            onClick={onRetry}
          >
            Retry
          </Button>
        ) : undefined
      }
    >
      {message}
    </Alert>
  );
}