import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()

export const errorHandler = (error, req, res, next) => {
    console.log(`Llegó al Middleware: ${error.message}`);
    return httpResponse.NotFound(res, error.message)
}