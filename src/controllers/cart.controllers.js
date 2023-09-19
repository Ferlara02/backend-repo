import * as service from "../services/cart.services.js"
import { HttpResponse } from "../utils/http.response.js"
const httpResponse = new HttpResponse()
import error from "../utils/errors.dictionary.js"

export const getAll = async (req, res, next) => {
    try {
        const responseCarts = await service.getAll()
        return httpResponse.Ok(res, responseCarts)
    } catch (error) {
        next(error.message)
    }
}

export const getById = async (req, res, next) => {
    try {
        const {id} = req.params
        const cart = await service.getById(id)
        if(!cart) return httpResponse.NotFound(res, error.CART_NOT_FOUND)
        else return httpResponse.Ok(res, cart.products)
    } catch (error) {
        next(error.message)
    }
}

export const create = async (req, res, next) => {
    try {
        const cartCreated = await service.create()
        if(!cartCreated) return httpResponse.NotFound(res, error.VALIDATION_ERROR)
        else return httpResponse.Ok(res, cartCreated)
    } catch (error) {
        next(error.message)
    }
}

export const addProdToCart = async (req, res, next) => {
    try {
        const {id, prodId} = req.params
        const cartUpdated = await service.addProdToCart(id, prodId)
        httpResponse.Ok(res, cartUpdated)
    } catch (error) {
        next(error.message)
    }
}

export const updateCartProducts = async(req, res, next) => {
    try {
        const {id} = req.params
        const {prods} = req.body
        if(!prods) return httpResponse.NotFound(res, error.MISSING_VALUES)
        const response = await service.updateCartProducts(id, prods)
        
        if(response) {
            res.status(200).json({msg:"Cart updated succesfully", response})
        } else {
            httpResponse.NotFound(res, error.CART_NOT_FOUND)
        }

    } catch (error) {
        next(error)
    }
}

export const updQtyProdInCart = async(req, res, next) => {
    try {
        const {idCart, idProd} = req.params
        const {quantity} = req.body
        if(!quantity ) return httpResponse.NotFound(res, "Quantity value is required")

        const response = await service.updQtyProdInCart(quantity, idCart, idProd)

        if(!response) return httpResponse.NotFound(res, "id cart or id prod invalid")
        return httpResponse.Ok(res, response)
     } catch (error) {
         next(error)
     }
}

export const deleteProdFromCart = async (req, res, next) => {
    try {
        const {id, idProd} = req.params
        const prodDeleted = await service.deleteProdFromCart(id, idProd)
        if(!prodDeleted) httpResponse.NotFound(res, "Cannot delete prod")
        httpResponse.Ok(res, ("Product deleted", prodDeleted))
    } catch (error) {
        next(error)
    }
}

export const remove = async (req, res, next) => {
    try {
        const {id} = req.params
        const cartDeleted = await service.removeCart(id)
        res.json(cartDeleted)
    } catch (error) {
        next(error.message)
    }
}