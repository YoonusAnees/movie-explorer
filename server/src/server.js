import mongoose from "mongoose";

import app from "./app.js";
import { environment } from "./config/environment.js";
import { connectDatabase } from "./config/database.js";

try {
    await connectDatabase();
    const server = app.listen(environment.PORT, () => {
        console.log(`API running on port ${environment.PORT}`);
    });

    function shutdown() {
        server.close(async () => {
            await mongoose.disconnect();
            process.exit(0);
        });

        setTimeout(() => process.exit(1), 10000).unref();
    }

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
} catch (error) {
    console.error(
        "Startup failed:",
        error.name,
        "Check database access and environment configuration."
    );

    process.exit(1);
}