import winston from "winston";

const { transports, createLogger, format } = winston;
const { combine, splat, timestamp, printf, colorize } = format;
const baseDir = process.cwd();

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message} `;
  if (Object.getOwnPropertyNames(metadata).length) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const filterOnly = (level: string) => {
  return format((info: any) => {
    if (info["level"] === level) {
      return info;
    }
  })();
};

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "debug",
      handleExceptions: true,
      format: combine(colorize(), splat(), timestamp(), myFormat),
    }),
    new transports.File({
      filename: `${baseDir}/error.log`,
      level: "error",
      maxsize: 10485760, // 100MB
      maxFiles: 3,
      handleExceptions: true,
      format: combine(filterOnly("error"), colorize(), splat(), timestamp(), myFormat),
    }),
    new transports.File({
      filename: `${baseDir}/warning.log`,
      level: "warning",
      maxsize: 10485760, // 10MB
      maxFiles: 3,
      handleExceptions: true,
      format: combine(filterOnly("warning"), colorize(), splat(), timestamp(), myFormat),
    }),
    new transports.File({
      filename: `${baseDir}/info.log`,
      level: "info",
      maxsize: 10485760, // 10MB
      maxFiles: 3,
      handleExceptions: true,
      format: combine(filterOnly("info"), colorize(), splat(), timestamp(), myFormat),
    }),
  ],
  exitOnError: false,
});

export default logger;
