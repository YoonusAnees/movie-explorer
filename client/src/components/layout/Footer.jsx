import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

const tmdbLogo =
  "https://www.themoviedb.org/assets/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";

const navigation = [
  { label: "Discover movies", to: "/" },
  { label: "My favorites", to: "/favorites" },
];

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        borderTop: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.4fr 0.8fr 1fr",
            },
            gap: {
              xs: 4,
              md: 6,
            },
            py: {
              xs: 4,
              md: 5,
            },
          }}
        >
          {/* Brand */}
          <Stack spacing={2} alignItems="flex-start">
            <Link
              component={RouterLink}
              to="/"
              underline="none"
              color="text.primary"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <MovieOutlinedIcon color="black" />

              <Typography
                component="span"
                fontWeight={800}
                fontSize={18}
                letterSpacing="-0.4px"
              >
                Movie Explorer
              </Typography>
            </Link>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                maxWidth: 300,
                lineHeight: 1.8,
              }}
            >
              Find your next movie, explore its story,
              and save the films you want to watch.
            </Typography>
          </Stack>

          {/* Navigation */}
          <Stack
            component="nav"
            aria-label="Footer navigation"
            spacing={1.5}
            alignItems="flex-start"
          >
            <Typography
              component="h2"
              variant="body2"
              fontWeight={700}
              sx={{ mb: 0.5 }}
            >
              Explore
            </Typography>

            {navigation.map((item) => (
              <Link
                key={item.to}
                component={RouterLink}
                to={item.to}
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={{
                  py: 0.5,
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {item.label}
              </Link>
            ))}
          </Stack>

          {/* Data provider */}
          <Stack spacing={1.5} alignItems="flex-start">
            <Typography
              component="h2"
              variant="body2"
              fontWeight={700}
            >
              Movie data
            </Typography>

            <Link
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit The Movie Database"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                py: 0.5,
              }}
            >
              <Box
                component="img"
                src={tmdbLogo}
                alt="TMDb"
                loading="lazy"
                sx={{
                  width: 100,
                  display: "block",
                }}
              />

              <OpenInNewRoundedIcon
                sx={{
                  fontSize: 15,
                  color: "text.secondary",
                }}
              />
            </Link>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                maxWidth: 300,
                lineHeight: 1.8,
              }}
            >
              This product uses the TMDB API but is
              not endorsed or certified by TMDB.
            </Typography>
          </Stack>
        </Box>

        <Divider />

        {/* Copyright */}
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          justifyContent="space-between"
          spacing={1.5}
          sx={{ py: 2.5 }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            alignSelf="center"
          >
            © {year} Movie Explorer. All rights reserved.
          </Typography>

          <Button
            component={RouterLink}
            to="/"
            size="small"
            endIcon={<MovieOutlinedIcon fontSize="small" />}
            sx={{
              px: 0,
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                bgcolor: "transparent",
              },
            }}
          >
            Find something to watch
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}