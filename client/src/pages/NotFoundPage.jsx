import { Link } from "react-router-dom";

import {
  Button,
  Typography,
} from "@mui/material";

export default function NotFoundPage() {
  return (
    <>
      <Typography
        component="h1"
        variant="h4"
      >
        Page not found
      </Typography>

      <Button
        component={Link}
        to="/"
        sx={{ mt: 2 }}
      >
        Go to discovery
      </Button>
    </>
  );
}