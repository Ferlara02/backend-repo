import { logger } from "../utils/winston.config.js";
import { Router } from "express";
const router = Router()

router.get("/loggerTest", (req, res) => {
    logger.debug("Imprimo debug")
    logger.http("Imprimo http")
    logger.info("Imprimo info")
    logger.warning("Imprimo warn")
    logger.error("Imprimo error")
    logger.fatal("Imprimo fatal")
    res.json({msg: "Loggers correctly showed"})
})

export default router