import axios from "axios";

import { environment } from "../config/environment.js";
import { AppError } from "../utils/AppError.js";

const token = (environment.TMDB_ACCESS_TOKEN || "").trim();
const isJwt = token.startsWith("eyJ") || token.startsWith("Bearer ");

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    timeout: 10000,
    headers: isJwt
        ? {
              Authorization: token.startsWith("Bearer ")
                  ? token
                  : `Bearer ${token}`,
          }
        : {},
});

async function get(path, params = {}) {
    try {
        const queryParams = {
            language: "en-US",
            ...params,
        };

        if (!isJwt && token) {
            queryParams.api_key = token;
        }

        const response = await tmdb.get(path, {
            params: queryParams,
        });

        return response.data;
    } catch (error) {
        // Log the cause without exposing your token.
        console.error("TMDb error:", {
            endpoint: path,
            status: error.response?.status,
            code: error.code,
            message:
                error.response?.data?.status_message ||
                error.message,
        });

        if (error.response?.status === 401) {
            throw new AppError(
                "TMDb authentication failed. Check the backend access token.",
                502
            );
        }

        if (error.response?.status === 404) {
            throw new AppError("Movie not found.", 404);
        }

        if (error.response?.status === 429) {
            throw new AppError(
                "Movie service is busy. Please try again shortly.",
                503
            );
        }

        throw new AppError(
            "Movie information is temporarily unavailable. Please try again.",
            502
        );
    }
}

function paginated(data) {
    return {
        ...data,
        total_pages: Math.min(data.total_pages || 0, 500),
    };
}

export async function trending({ page }) {
    return paginated(
        await get("/trending/movie/week", { page })
    );
}

export async function search({ query, page, year }) {
    return paginated(
        await get("/search/movie", {
            query,
            page,
            year,
            include_adult: false,
        })
    );
}

export async function discover({
    page,
    genre,
    year,
    rating,
}) {
    return paginated(
        await get("/discover/movie", {
            page,
            include_adult: false,
            sort_by: "popularity.desc",
            with_genres: genre,
            primary_release_year: year,
            "vote_average.gte": rating,
        })
    );
}

export async function genres() {
    const data = await get("/genre/movie/list");
    return data.genres;
}

export async function details(movieId) {
    return get(`/movie/${movieId}`, {
        append_to_response: "credits,videos",
    });
}