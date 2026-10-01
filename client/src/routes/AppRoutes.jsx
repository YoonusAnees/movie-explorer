import { Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import HomePage from "../pages/HomePage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import FavoritesPage from "../pages/FavoritesPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Auth pages: full-screen, no navbar/container ── */}
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      {/* ── Main app shell ── */}
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />

        <Route path="movies/:movieId" element={<MovieDetailsPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}