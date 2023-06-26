import fs from 'fs'
import ProductManager from "../manager/productManager.js";
import {__dirname} from "../utils.js";
const productManager = new ProductManager(__dirname + '/db/products.json')

export default class CartManager {
    constructor(path){
        this.path = path
    }

    async getAllCarts(){
        try {
            if(fs.existsSync(this.path)){
                const cart = await fs.promises.readFile(this.path, 'utf-8')
                const cartJs = JSON.parse(cart)
                return cartJs
            } else return [];
        } catch (error) {
            console.log(error);
        }
    }

    async createCart() {
        try {
            const cart = {
                id: await this.#getID() + 1,
                products: [],
            };
            const cartsFile = await this.getAllCarts();
            cartsFile.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(idCart) {
        try {
            const cartsFile = await this.getAllCarts()
            const cartFind = cartsFile.find(cart => cart.id === idCart)
            if(!cartFind){
                return `Cart ${idCart} does not exists.`
            }
            return cartFind.products
        } catch (error) {
            console.log(error);
        }
    }


    async saveProdInCart(idCart, idProd) {
        try {
            const cartsFile = await this.getAllCarts()
            const cartExists = cartsFile.find(cart => cart.id === idCart)
            if(cartExists) {
                const prodExistsInCart = cartExists.products.find(prod => prod.product === idProd)
                if(prodExistsInCart) {
                    prodExistsInCart.quantity++
                } else {
                    const prod = {
                        product: idProd,
                        quantity: 1
                    }
                    cartExists.products.push(prod)
                }
                await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
                return 'Carrito actualizado.'
            } else {
                throw new Error('Cart not found')
            }
        }catch (error) {
            console.log(error);
        }
    }

    async deleteCart(id) {
        try {
            const cartsFile = await this.getAllCarts()
            const cartIndex = cartsFile.findIndex(cart => cart.id === id)

            if(cartIndex === -1) {
                return `Cart ${id} does not exists`
            }

            cartsFile.splice(cartIndex, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile))
            return `Cart deleted succesfully`

        } catch (error) {
            console.log(error);
        }
    }

    async #getID(){
        try{
            const cartsFile = await this.getAllCarts()
            let maxId = 0;
            cartsFile.map((cart) => {
                if(cart.id > maxId) maxId = cart.id
            })
            return maxId
        } catch (error){
            console.log(error)
        }
    }
}