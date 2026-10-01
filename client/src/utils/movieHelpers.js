export const imageUrl = (path, size = "w500") =>
  path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : null;

export const releaseYear = (date) =>
  date ? date.slice(0, 4) : "Unknown year";

export function favoriteMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,

    genre_ids:
      movie.genre_ids ||
      movie.genres?.map((genre) => genre.id) ||
      [],
  };
}