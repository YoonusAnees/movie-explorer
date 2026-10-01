import {
  Box,
  Link,
  Typography,
} from "@mui/material";

export default function TrailerPlayer({
  videos = [],
}) {
  const youtubeVideos = videos.filter(
    (video) =>
      video.site === "YouTube" &&
      /^[A-Za-z0-9_-]{11}$/.test(video.key)
  );

  const trailer =
    youtubeVideos.find(
      (video) =>
        video.type === "Trailer" &&
        video.official
    ) ||
    youtubeVideos.find(
      (video) => video.type === "Trailer"
    );

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        Trailer
      </Typography>

      {trailer ? (
        <>
          <Box
            component="iframe"
            src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
            title={
              trailer.name || "Movie trailer"
            }
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{
              width: "100%",
              aspectRatio: "16 / 9",
              border: 0,
              borderRadius: 2,
            }}
          />

          <Link
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube
          </Link>
        </>
      ) : (
        <Typography color="text.secondary">
          No trailer is available for this movie.
        </Typography>
      )}
    </Box>
  );
}