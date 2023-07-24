import * as service from "../services/product.services.js"

export const getAll = async (req, res, next) => {
    try {
        const responseProds = await service.getAll()
        res.status(200).json(responseProds)
    } catch (error) {
        next(error.message)
    }
}

export const getById = async (req, res, next) => {
    try {
        const {id} = req.params
        const prod = await service.getById(id)
        if(!prod) return res.status(404).json({msg: "Prod not found."})
        else return res.status(200).json(prod)
    } catch (error) {
        next(error.message)
    }
}

export const create = async (req, res, next) => {
    try {
        const prodCreated = await service.create(req.body)
        if(!prodCreated) return res.status(404).json({msg: "Prod not created. Validation error"})
        else return res.status(200).json(prodCreated)
    } catch (error) {
        next(error.message)
    }
}

export const update = async (req, res, next) => {
    try {
        const {id} = req.params
        const prodUpdated = await service.update(id, req.body)
        res.status(200).json(prodUpdated)
    } catch (error) {
        next(error.message)
    }
}

export const remove = async (req, res, next) => {
    try {
        const {id} = req.params
        const prodDeleted = await service.remove(id)
        res.json(prodDeleted)
    } catch (error) {
        next(error.message)
    }
}