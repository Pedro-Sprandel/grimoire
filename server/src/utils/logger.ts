import winston from "winston";

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue"
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      format: winston.format.uncolorize(),
      filename: "logs/error.log",
      level: "error"
    })
  ]
});

export default logger;
