import winston from "winston";

const devLogger = winston.createLogger({
  level: "debug", // Log only if info.level less than or equal to this level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/dev.log", // Save logs to this file
      handleExceptions: true,
    }),
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

export default devLogger;
