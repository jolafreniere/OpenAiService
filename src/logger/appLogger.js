import chalk from "chalk";
import winston from "winston";

const msgFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${chalk.blue(timestamp)} ${message}`;
});

const appLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), msgFormat),
  transports: [new winston.transports.Console()],
});

export default appLogger;
