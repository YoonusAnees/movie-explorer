import * as service from "../services/service.movieService.js";

export async function trending(req, res) {
    res.json({
        success: true,
        data: await service.trending(req.validated),
    });
}

export async function search(req, res) {
    res.json({
        success: true,
        data: await service.search(req.validated),
    });
}

export async function discover(req, res) {
    res.json({
        success: true,
        data: await service.discover(req.validated),
    });
}

export async function genres(req, res) {
    res.json({
        success: true,
        data: await service.genres(),
    });
}

export async function details(req, res) {
    res.json({
        success: true,
        data: await service.details(req.validated.movieId),
    });
}