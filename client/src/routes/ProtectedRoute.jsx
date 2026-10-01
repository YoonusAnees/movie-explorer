import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useSelector } from "react-redux";

import LoadingState from "../components/common/LoadingState";

export default function ProtectedRoute() {
  const location = useLocation();

  const { user, initialized } = useSelector(
    (state) => state.auth
  );

  if (!initialized) {
    return (
      <LoadingState label="Checking your session..." />
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{
        from: location.pathname,
      }}
      replace
    />
  );
}