import { AppError } from "../utils/AppError.js";

export const validateRequest =
    (schema, source = "body") =>
        (req, res, next) => {
            const parsed = schema.safeParse(req[source]);

            if (!parsed.success) {
                const message = parsed.error.issues
                    .map((issue) => issue.message)
                    .join(" ");

                return next(new AppError(message, 400));
            }

            req.validated = parsed.data;
            next();
        };