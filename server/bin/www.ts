import app from "../app.ts";
import logger from "../utils/logger.js";

const PORT = 3000;

const server = app.listen(PORT, () => logger.info("Server started"));

server.on("error", (error: Error) => {
  logger.error("Server error: ", error);
});
