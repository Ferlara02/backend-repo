import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()
import { logger } from "../utils/winston.config.js"

export const errorHandler = (error, req, res, next) => {
    logger(`Llegó al errorHandler: ${error.message}`);
    return httpResponse.NotFound(res, error.message)
}