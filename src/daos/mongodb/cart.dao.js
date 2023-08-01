import { CartModel } from "./models/cart.model.js";


export default class CartDaoMongoDB {
    async getAll(){
        try {
            const response = await CartModel.find({})
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async getCart(id){
        try {
            const result = await CartModel.findById(id).populate('products.id').lean()
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async create(){
        try {
            const response = await CartModel.create({products: []})

            return response
        } catch (error) {
            console.log(error);
        }
    }
    async addProdToCart(id, prodId){
        try {
            const cart = await CartModel.findById(id)
            const isProdInCart = cart.products.find(prod=> prod.id.toString() === prodId)
            if(isProdInCart) {
                isProdInCart.quantity++
            } else {
                cart.products.push({
                    id: prodId,
                    quantity: 1
                })
            }
            await cart.save()
            return cart
        } catch (error) {
            console.log(error);
        }
    }
    async updQtyProdInCart(quantity, idCart, idProd) {
        const cart = await CartModel.findById(idCart)
        const prodInCart = cart.products.findIndex(prod=> prod.id.toString() === idProd)
        if(!cart || prodInCart === -1) return false
        cart.products[prodInCart].quantity = quantity
        await cart.save()
        return cart
    }

    async updateProductsCart(id, prods) {
        try {
            const cart = await CartModel.findById(id)
            
            cart.products = prods
            await cart.save()
            return cart
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProdFromCart(id, idProd){
        try {
            const cart = await CartModel.findById(id)
            if(!cart) return false
            cart.products = cart.products.filter((prod) => prod.id.toString() !== idProd)
            await cart.save()
            return cart
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id){
        try {
            const response = await CartModel.findByIdAndUpdate(id, {products: []}, {new: true})
            return response
        } catch (error) {
            console.log(error);
        }
    }
}