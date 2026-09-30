import axios from "axios";

import { environment } from "../config/environment.js";
import { AppError } from "../utils/AppError.js";

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    timeout: 10000,
    headers: {
        Authorization: `Bearer ${environment.TMDB_ACCESS_TOKEN}`,
    },
});

async function get(path, params = {}) {
    try {
        const response = await tmdb.get(path, {
            params: {
                language: "en-US",
                ...params,
            },
        });

        return response.data;
    } catch (error) {
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