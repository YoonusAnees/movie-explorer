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

    const statusCode =
        typeof error.statusCode === "number"
            ? error.statusCode
            : typeof error.status === "number"
                ? error.status
                : 500;

    if (statusCode >= 500) {
        console.error("Request failed:", error.name || "Error", statusCode, error.message);
    }

    res.status(statusCode).json({
        success: false,
        message:
            statusCode >= 500 && !error.isOperational
                ? "Something went wrong. Please try again."
                : error.message,
    });
}