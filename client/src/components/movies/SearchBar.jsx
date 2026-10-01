import {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Button,
  TextField,
} from "@mui/material";

import { SearchIcon } from "../common/Icons";

export default function SearchBar({
  query,
  onSearch,
}) {
  const [value, setValue] = useState(query);

  useEffect(() => {
    setValue(query);
  }, [query]);

  function submit(event) {
    event.preventDefault();
    onSearch(value.trim());
  }

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        display: "flex",
        gap: 1.25,
        my: 3,
        maxWidth: 720,
      }}
    >
      <TextField
        fullWidth
        placeholder="Search for movies, actors, titles..."
        value={value}
        onChange={(event) =>
          setValue(event.target.value)
        }
        inputProps={{
          maxLength: 200,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 44,
            borderRadius: 2.5,
            bgcolor: "background.paper",
            fontSize: "0.92rem",
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        aria-label="Search movies"
        sx={{
          height: 44,
          borderRadius: 2.5,
          px: { xs: 2, sm: 3 },
          minWidth: {
            xs: 52,
            sm: 110,
          },
          whiteSpace: "nowrap",
        }}
      >
        <SearchIcon sx={{ fontSize: 20 }} />

        <Box
          component="span"
          sx={{
            ml: 1,
            display: {
              xs: "none",
              sm: "inline",
            },
            fontWeight: 600,
          }}
        >
          Search
        </Box>
      </Button>
    </Box>
  );
}