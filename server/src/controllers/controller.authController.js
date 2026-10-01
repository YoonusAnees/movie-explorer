import * as authService from "../services/service.authService.js";
import { environment } from "../config/environment.js";

const isProduction =
    environment.NODE_ENV === "production" ||
    process.env.RENDER === "true" ||
    Boolean(process.env.RENDER_SERVICE_ID);

function getCookieOptions(req) {
    const isHttps = req
        ? req.secure || req.headers["x-forwarded-proto"] === "https"
        : isProduction;
    const secure = isProduction || Boolean(isHttps);

    return {
        httpOnly: true,
        secure,
        sameSite: secure ? "none" : "lax",
        path: "/",
    };
}

function sendSession(req, res, user, status) {
    const token = authService.signSession(user);
    const cookieOptions = getCookieOptions(req);

    res.cookie(
        "movie_session",
        token,
        {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }
    );

    res.status(status).json({
        success: true,
        data: user,
        token,
    });
}

export async function register(req, res) {
    const user = await authService.register(req.validated);
    sendSession(req, res, user, 201);
}

export async function login(req, res) {
    const user = await authService.login(req.validated);
    sendSession(req, res, user, 200);
}

export function logout(req, res) {
    res.clearCookie("movie_session", getCookieOptions(req));

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