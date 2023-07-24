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
            const response = await CartModel.findById(id)
            return response
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
    async addProdToCart(id, idProd){
        try {
            const cart = await CartModel.findById(id)
            const isProdInCart = cart.products.find((prod) => prod.id.toString() === idProd.toString())
            if(isProdInCart) {
                isProdInCart.quantity++
            } else {
                cart.products.push({
                    id: idProd,
                    quantity: 1
                })
            }
            await cart.save()
            return cart
        } catch (error) {
            console.log(error);
        }
    }
    async delete(id){
        try {
            const response = await CartModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            console.log(error);
        }
    }
}