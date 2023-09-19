const HttpStatusCode = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
}

export class HttpResponse {
    Ok(res, data){
        return res.status(HttpStatusCode.OK).json({
            status: HttpStatusCode.OK,
            message: "Success",
            data: data
        })
    }
    NotFound(res, data){
        return res.status(HttpStatusCode.NOT_FOUND).json({
            status: HttpStatusCode.NOT_FOUND,
            message: "Not found",
            error: data
        })
    }
    Unauthorized(res, data){
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
            status: HttpStatusCode.UNAUTHORIZED,
            message: "Unauthorized",
            error: data
        })
    }
    Forbidden(res, data){
        return res.status(HttpStatusCode.FORBIDDEN).json({
            status: HttpStatusCode.FORBIDDEN,
            message: "Forbidden",
            error: data
        })
    }
    ServerError(res, data){
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            error: data
        })
    }
}