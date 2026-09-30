import * as authService from "../services/service.authService.js";
import { environment } from "../config/environment.js";

const cookieOptions = {
    httpOnly: true,
    secure: environment.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
};

function sendSession(res, user, status) {
    res.cookie(
        "movie_session",
        authService.signSession(user),
        {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }
    );

    res.status(status).json({
        success: true,
        data: user,
    });
}

export async function register(req, res) {
    const user = await authService.register(req.validated);
    sendSession(res, user, 201);
}

export async function login(req, res) {
    const user = await authService.login(req.validated);
    sendSession(res, user, 200);
}

export function logout(req, res) {
    res.clearCookie("movie_session", cookieOptions);

    res.json({
        success: true,
        message: "Signed out.",
    });
}

export function me(req, res) {
    res.json({
        success: true,
        data: authService.publicUser(req.user),
    });
}