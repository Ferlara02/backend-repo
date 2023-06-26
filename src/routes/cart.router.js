import { Router } from "express";
const router = Router();

import {__dirname} from "../utils.js";

import CartManager from "../manager/cart.manager.js";
const cartManager = new CartManager(__dirname + '/db/carts.json')

import ProductManager from "../manager/productManager.js";
const productManager = new ProductManager(__dirname + '/db/products.json')

//Recibo el arreglo de products del cart especificado por su Id.
router.get('/:cid', async(req, res, next) => {
    try {
        const {cid} = req.params
        const cartProds = await cartManager.getCartById(Number(cid))
        res.status(200).json(cartProds)
    } catch (error) {
        next(error)
    }
})


//creo un nuevoc cart con id number autogenerable
router.post('/', async(req, res, next) => {
    try {
        const newCart = await cartManager.createCart()
        res.status(200).json(newCart)

    } catch (error) {
        next(error)
    }
})


//actualizo el cart
router.post('/:cid/products/:pid', async(req, res, next) => {
    try {
        const {cid, pid} = req.params
        const cartId = Number(cid)
        const prodId = Number(pid)

        const prodExists = await productManager.getProductById(prodId)

        if(prodExists !== 'Producto no encontrado') {  //verifico si el producto existe en el json
            const updatedCart = await cartManager.saveProdInCart(cartId, prodId)
            if(updatedCart === 'Carrito actualizado.'){
                res.status(200).json({msg: `OK. Product ${prodId} added to Cart ${cartId}.`, res: updatedCart})
            } else {
                res.status(400).json({msg: 'Cart does not exists.'})
            }
       } else {
            res.status(400).json({msg: 'Prod does not exists.'})
       }
    } catch (error) {
        next(error)
    }
})

router.delete('/:cid', async(req, res, next) => {
    try{
        const {cid} = req.params
        const cartId = Number(cid)
        const cartDelete = await cartManager.deleteCart(cartId)
        if(cartDelete === `Cart deleted succesfully`) {
            res.status(200).json({msg: `Cart ${cartId} deleted.`})
        } else {
            res.status(400).json({msg: `Cart ${cartId} does not exists.`})
        }
    } catch(error) {
        next(error)
    }
})

export default router