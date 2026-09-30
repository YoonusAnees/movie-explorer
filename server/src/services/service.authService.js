import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/model.user.js";
import { environment } from "../config/environment.js";
import { AppError } from "../utils/AppError.js";

export const publicUser = (user) => ({
    id: user._id.toString(),
    username: user.username,
});

const dummyHash = bcrypt.hashSync(
    "dummy-password-never-used",
    12
);

export async function register({ username, password }) {
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
        username,
        passwordHash,
    });

    return publicUser(user);
}

export async function login({ username, password }) {
    const user = await User.findOne({ username }).select(
        "+passwordHash"
    );

    const matches = await bcrypt.compare(
        password,
        user?.passwordHash || dummyHash
    );

    if (!user || !matches) {
        throw new AppError(
            "Incorrect username or password.",
            401
        );
    }

    return publicUser(user);
}

export function signSession(user) {
    return jwt.sign({}, environment.JWT_SECRET, {
        subject: user.id,
        expiresIn: "7d",
        algorithm: "HS256",
        issuer: "movie-explorer",
        audience: "movie-explorer-client",
    });
}