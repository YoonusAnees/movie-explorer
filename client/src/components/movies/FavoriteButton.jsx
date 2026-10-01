import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  IconButton,
  Tooltip,
} from "@mui/material";

import {
  FavoriteIcon,
  FavoriteBorderIcon,
} from "../common/Icons";

import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import { favoriteMovie } from "../../utils/movieHelpers";

export default function FavoriteButton({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(
    (state) => state.auth.user
  );

  const saved = useSelector((state) =>
    state.favorites.items.some(
      (item) => item.id === movie.id
    )
  );

  const label = saved
    ? "Remove from favorites"
    : "Save to favorites";

  function toggle() {
    if (!user) {
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });

      return;
    }

    dispatch(
      toggleFavorite(favoriteMovie(movie))
    );
  }

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={toggle}
        aria-label={`${label}: ${movie.title}`}
        aria-pressed={saved}
        color={saved ? "error" : "default"}
      >
        {saved ? (
          <FavoriteIcon />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}