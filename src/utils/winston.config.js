import winston from "winston"
import { __dirname } from "../utils.js"
import config from "../config.js"

console.log("NOVE_ENV--->", config.NODE_ENV);
const envConsoleLevel = config.NODE_ENV === 'development' ? 'debug' : 'info'

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "yellow",
        warning: "magenta",
        info: "green",
        http: "gray",
        debug: "cyan"
    }
}

const logConfig = {

    levels: customLevelOptions.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MM-DD-YYYY HH:mm:ss',
        }),
        winston.format.colorize({colors: customLevelOptions.colors}),
        winston.format.printf( (info) => `${info.level} | ${info.timestamp} | ${info.message}` )
    ),
    transports: [
        new winston.transports.Console({
            level: envConsoleLevel
        }),
        new winston.transports.File({
            filename: "./src/utils/errorLogs/errors.log",
            level: "error"
        }),
        // winston.add(new winston.transports.MongoDB({
        //     options: { useUnifiedTopology: true },
        //     db: "URL"/*URL DE LA CONNECTION TO MONGODB*/,
        //     collection: "logs",
        //     tryReconnect: true,
        //     level: "error"
        // }))
    ]
}

export const logger = winston.createLogger(logConfig)
// logger.level = "silly"
// logger.silly("Imprimo silly")
// logger.debug("Imprimo debug")
// logger.verbose("Imprimo verbose")
// logger.http("Imprimo http")
// logger.info("Imprimo info")
// logger.warn("Imprimo warn")
// logger.error("Imprimo error")
