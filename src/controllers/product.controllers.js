import * as service from "../services/product.services.js"
import { HttpResponse } from "../utils/http.response.js"
const httpResponse = new HttpResponse()
import error from "../utils/errors.dictionary.js"
import { logger } from "../utils/winston.config.js"
import * as userService from "../services/user.services.js"
import persistence from "../persistence/daos/factory.js"
import { sendMail } from "../services/email.service.js"
const {userDao} = persistence

export const getAll = async (req, res, next) => {
    try {
        const { page, limit, category, available, sort } = req.query

        const response = await service.getAll(page, limit, category, available, sort)

        return httpResponse.Ok(res, response)
    } catch (error) {
        next(error.message)
    }
}

export const getById = async (req, res, next) => {
    try {
        const {id} = req.params
        const prod = await service.getById(id)
        if(!prod) return httpResponse.NotFound(res, error.PROD_NOT_FOUND)
        else {
            logger.info(prod)
            return httpResponse.Ok(res, prod)
        }
    } catch (error) {
        next(error.message)
    }
}

export const create = async (req, res, next) => {
    try {
        const { title, description, code, price, stock, category, thumbnails, status } = req.body
        const user = await userService.getById(req.session.passport?.user)
        const prod = user?.role === "premium" ? 
                                    { title, description, code, price, stock, category, thumbnails, owner: user.email, status} 
                                    :
                                    { title, description, code, price, stock, category, thumbnails, status } 
        const prodCreated = await service.create(prod)
        if(!prodCreated) return httpResponse.NotFound(res, error.VALIDATION_ERROR)
        else return httpResponse.Ok(res, prodCreated)
    } catch (error) {
        next(error.message)
    }
}

export const update = async (req, res, next) => {
    try {
        const {id} = req.params
        const prodUpdated = await service.update(id, req.body)
        return httpResponse.Ok(res, prodUpdated)
    } catch (error) {
        next(error.message)
    }
}

export const remove = async (req, res, next) => {
    try {
        const {id} = req.params
        const prod = await service.getById(id)
        const prodDeleted = await service.remove(id)
        if(prod.owner.includes("@")) {
            const user = await userDao.getByEmail(prod.owner)
            await sendMail(user, "prodDelete")
            return httpResponse.Ok(res, {msg: "Producto perteneciente a un usuario premium eliminado, se ha enviado un correo de aviso a su propietario", data: prodDeleted})
        }
        else {
            return httpResponse.Ok(res, {msg: "Producto eliminado", data: prodDeleted})
        }
    } catch (error) {
        next(error.message)
    }
}

export const getByIdDTO = async (req, res, next) => {
    try {
        const {id} = req.params
        const prod = await service.getByIdDTO(id)
        if(!prod) {
            return httpResponse.NotFound(res, error.PROD_NOT_FOUND)
        } else return res.status(200).json(prod)
    } catch (error) {
        next(error.message)
    }
}

export const createProdDTO = async(req, res, next) => {
    try {
        const newProd = await service.createProdDTO(req.body)
        if(!newProd) return httpResponse.NotFound(res, error.VALIDATION_ERROR)
        else return httpResponse.Ok(res, newProd)
    } catch (error) {
        next(error.message)
    }
}

// export const createMock = async(req, res) => {
//     try {
//         const response = await service.createMock()
//         logger.info(`MOCK CREADO`)
//         res.json(response)
//     } catch (error) {
//         next(error.message)
//     }
// }