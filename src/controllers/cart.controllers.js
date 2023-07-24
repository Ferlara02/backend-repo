import * as service from "../services/cart.services.js"

export const getAll = async (req, res, next) => {
    try {
        const responseCarts = await service.getAll()
        res.status(200).json(cartsProds)
    } catch (error) {
        next(error.message)
    }
}

export const getById = async (req, res, next) => {
    try {
        const {id} = req.params
        const cart = await service.getById(id)
        if(!cart) return res.status(404).json({msg: "cart not found."})
        else return res.status(200).json(cart)
    } catch (error) {
        next(error.message)
    }
}

export const create = async (req, res, next) => {
    try {
        const cartCreated = await service.create()
        if(!cartCreated) return res.status(404).json({msg: "cart not created. Validation error"})
        else return res.status(200).json(cartCreated)
    } catch (error) {
        next(error.message)
    }
}

export const addProdToCart = async (req, res, next) => {
    try {
        const {id, prodId} = req.params
        const cartUpdated = await service.addProdToCart(id, prodId)
        res.status(200).json(cartUpdated)
    } catch (error) {
        next(error.message)
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