import {
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function MovieFilters({
  filters,
  genres = [],
  onChange,
}) {
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 1887 },
    (_, index) => currentYear - index
  );

  const update = (key, value) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const hasActiveFilters = Boolean(
    filters.genre || filters.year || filters.rating
  );

  const menuProps = {
    PaperProps: {
      sx: {
        maxHeight: 320,
        borderRadius: 2.5,
        mt: 0.5,
        boxShadow: (t) =>
          t.palette.mode === "dark"
            ? "0 10px 30px rgba(0, 0, 0, 0.6)"
            : "0 10px 30px rgba(0, 0, 0, 0.1)",
        border: 1,
        borderColor: "divider",
        "& .MuiMenuItem-root": {
          fontSize: "0.88rem",
          minHeight: 42,
          py: 1.5,
          px: 2.25,
          borderRadius: 1.5,
          mx: 0.75,
          my: 0.35,
          "&.Mui-selected": {
            fontWeight: 700,
            bgcolor: "action.selected",
          },
        },
      },
    },
  };

  // Reusable sleek input styling: slim vertical height, wide readable horizontal room
  const inputSx = {
    minWidth: { xs: "100%", sm: 220, md: 260 },
    flex: 1,
    "& .MuiOutlinedInput-root": {
      height: 40,
      borderRadius: 2.5,
      fontSize: "0.88rem",
      bgcolor: "background.paper",
    },
    "& .MuiSelect-select": {
      py: "8px !important",
      display: "flex",
      alignItems: "center",
      fontWeight: 500,
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.85rem",
      transform: "translate(14px, 9px) scale(1)",
      "&.MuiInputLabel-shrink": {
        transform: "translate(14px, -8px) scale(0.75)",
      },
    },
  };

  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={1.75}
      alignItems={{ sm: "center" }}
      sx={{ mb: 3 }}
    >
      <TextField
        select
        label="Genre"
        value={filters.genre}
        onChange={(event) =>
          update("genre", event.target.value)
        }
        SelectProps={{
          MenuProps: menuProps,
        }}
        sx={inputSx}
      >
        <MenuItem value="">
          <Typography color="text.secondary" variant="body2">
            All genres
          </Typography>
        </MenuItem>

        {genres.map((genre) => (
          <MenuItem
            key={genre.id}
            value={String(genre.id)}
          >
            {genre.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Release year"
        value={filters.year}
        onChange={(event) =>
          update("year", event.target.value)
        }
        SelectProps={{
          MenuProps: menuProps,
        }}
        sx={inputSx}
      >
        <MenuItem value="">
          <Typography color="text.secondary" variant="body2">
            All years
          </Typography>
        </MenuItem>

        {years.map((year) => (
          <MenuItem
            key={year}
            value={String(year)}
          >
            {year}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Minimum rating"
        value={filters.rating}
        onChange={(event) =>
          update("rating", event.target.value)
        }
        SelectProps={{
          MenuProps: menuProps,
        }}
        sx={inputSx}
      >
        <MenuItem value="">
          <Typography color="text.secondary" variant="body2">
            Any rating
          </Typography>
        </MenuItem>

        {[9, 8, 7, 6, 5].map((rating) => (
          <MenuItem
            key={rating}
            value={String(rating)}
          >
            ★ {rating}+ / 10
          </MenuItem>
        ))}
      </TextField>

      {hasActiveFilters && (
        <Button
          variant="outlined"
          size="small"
          onClick={() =>
            onChange({
              genre: "",
              year: "",
              rating: "",
            })
          }
          sx={{
            height: 40,
            px: 2.25,
            borderRadius: 2.5,
            whiteSpace: "nowrap",
            alignSelf: { xs: "flex-start", sm: "center" },
            fontSize: "0.82rem",
          }}
        >
          Reset
        </Button>
      )}
    </Stack>
  );
}