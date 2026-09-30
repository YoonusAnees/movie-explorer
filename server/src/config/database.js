import mongoose from "mongoose";
import { environment } from "./environment.js";

export async function connectDatabase() {
    await mongoose.connect(environment.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected");
}