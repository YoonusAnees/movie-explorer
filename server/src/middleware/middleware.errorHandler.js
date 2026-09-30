export function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }

    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "That username is already taken.",
        });
    }

    const status = error.status || 500;

    if (status >= 500) {
        console.error("Request failed:", error.name, status);
    }

    res.status(status).json({
        success: false,
        message:
            status >= 500 && !error.status
                ? "Something went wrong. Please try again."
                : error.message,
    });
}