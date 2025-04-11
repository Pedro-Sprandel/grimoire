import dotenv from "dotenv";
dotenv.config({ path: ".env.development.local" });

import app from "../app.ts";
import logger from "../utils/logger.ts";
import connectDB from "../db.ts";

const PORT = process.env.PORT || 3000;

connectDB();

const server = app.listen(PORT, () =>
  logger.info(`Server started on port ${PORT}`)
);

server.on("error", (error: Error) => {
  logger.error("Server error: ", error);
});
