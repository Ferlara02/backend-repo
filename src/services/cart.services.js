import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB()
const cartDao = new CartDaoMongoDB()

export const getAll = async() => {
    try {
        const response = await cartDao.getAll()
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getById = async(id) => {
    try {
        const item = await cartDao.getById(id)
        if(!item) return false
        else return item
    } catch (error) {
        console.log(error);
    }
}

export const create = async() => {
    try {
        const newCart = await cartDao.create()
        return newCart
    } catch (error) {
        console.log(error);
    }
}

export const addProdToCart = async(id, prodId) => {
    try {
        const thisCart = await cartDao.getCart(id)
        const thisProd = await prodDao.getById(prodId)
        if (!thisCart) throw new Error("Cart not found");
        if (!thisProd) throw new Error("Product not found");
        const newProdInCart = await cartDao.addProdToCart(id, prodId)
        return newProdInCart
    } catch (error) {
        console.log(error);
    }
}

export const removeCart = async(id) => {
    try {
        const cartDeleted = await cartDao.delete(id)
        return cartDeleted
    } catch (error) {
        console.log(error);
    }
}