import dotenv from "dotenv";
import app from "../app.ts";
import logger from "../utils/logger.ts";
import connectDB from "../db.ts";

dotenv.config({ path: ".env.development.local"});

const PORT = process.env.PORT || 3000;

connectDB();

const server = app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

server.on("error", (error: Error) => {
  logger.error("Server error: ", error);
});