import persistence from "../persistence/daos/factory.js"
const {prodDao, cartDao} = persistence

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
        const item = await cartDao.getCart(id)
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

export const updateCartProducts = async(id, prods) => {
    try {
        //valida si el formato del arreglo de productos coincide con el del modelo del Cart.products:
        const prodsValidProps = prods.every((prod) => prod.id && prod.quantity)
        if(!prodsValidProps) throw new Error("The format is not valid")

        //valida si el arreglo de productos pasado por parámetro existe en la DB.
        const products = await prodDao.getProducts()
        const prodsDBId = products.map((prod) => prod.
        _id.toString()) //seteo un array con todos los ID´s en DB
        const prodsId = prods.map((prod) => prod.id.toString())
        const prodsExistInDB = prodsId.every((id) => prodsDBId.includes(id))
        if(!prodsExistInDB) throw new Error("Product not in DB")
        //---------------------

        const cartUpdated = await cartDao.updateProductsCart(id, prods)
        return cartUpdated


    } catch (error) {
        console.log(error);
    }
}

export const updQtyProdInCart = async(quantity, idCart, idProd) => {
    try {
        const stock = await cartDao.getCart(idCart)
        console.log("STOCK: ", stock);
        const response = await cartDao.updQtyProdInCart(quantity, idCart, idProd)
        if(!response) throw new Error("Cart or Product not found")
        return response
    } catch (error) {
        console.log(error);
    }
}

export const deleteProdFromCart = async(id, idProd) => {
    try {
        const thisCart = await cartDao.getCart(id)
        const thisProd = await prodDao.getById(idProd)
        if (!thisCart) throw new Error("Cart not found");
        if (!thisProd) throw new Error("Product not found");
        const prodDeleted = await cartDao.deleteProdFromCart(id, idProd)
        return prodDeleted
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