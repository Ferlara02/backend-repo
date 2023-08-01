import * as service from "../services/cart.services.js"

export const getAll = async (req, res, next) => {
    try {
        const responseCarts = await service.getAll()
        res.status(200).json(responseCarts)
    } catch (error) {
        next(error.message)
    }
}

export const getById = async (req, res, next) => {
    try {
        const {id} = req.params
        const cart = await service.getById(id)
        if(!cart) return res.status(404).json({msg: "cart not found."})
        else return res.status(200).json(cart.products)
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

export const updateCartProducts = async(req, res, next) => {
    try {
        const {id} = req.params
        const {prods} = req.body
        if(!prods) return res.status(404).json({msg: "Array is required from body"})
        const response = await service.updateCartProducts(id, prods)
        
        if(response) {
            res.status(200).json({msg:"Cart updated succesfully", response})
        } else {
            res.status(404).json({msg: "Not found"})
        }

    } catch (error) {
        next(error)
    }
}

export const updQtyProdInCart = async(req, res, next) => {
    try {
        const {idCart, idProd} = req.params
        const {quantity} = req.body
        if(!quantity ) return res.status(404).json({msg: "Quantity valor is required"})

        const response = await service.updQtyProdInCart(quantity, idCart, idProd)

        if(!response) return res.status(404).json({msg: "id cart or id prod invalid"})
        res.status(200).json(response)
     } catch (error) {
         next(error)
     }
}

export const deleteProdFromCart = async (req, res, next) => {
    try {
        const {id, idProd} = req.params
        const prodDeleted = await service.deleteProdFromCart(id, idProd)
        if(!prodDeleted) res.status(404).json({msg: "Cannot delete prod"})
        res.status(200).json({msg: "Product deleted", prodDeleted})
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