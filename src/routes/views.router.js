import { Router } from "express";
const router = Router()
import { __dirname } from "../utils.js";
import * as prodService from "../services/product.services.js"
import * as cartService from "../services/cart.services.js"


router.get('/products', async(req, res) => {
    const { page, limit, category, available, sort } = req.query

    const response = await prodService.getAll(page, limit, category, available, sort)

    const productsList = response.payload
    console.log(response);

    res.render('products', {productsList, 
        totalPages: response.totalPages, 
        currentPage: response.page, 
        prevPage: response.prevPage, 
        nextPage: response.nextPage, 
        hasPrevPage: response.hasPrevPage, 
        hasNextPage: response.hasNextPage, 
        prevLink: response.prevLink, 
        nextLink: response.nextLink
    })
})
router.get("/cart/:id", async(req, res) => {
    const {id} = req.params
    const cart = await cartService.getById(id)
    const cartProds = cart.products.map((prod) => ({
        ...prod.id,
        quantity: prod.quantity,
        total: prod.id.price * prod.quantity
    }))
    console.log(cartProds);
    res.render("cart", {idCart: cart._id, cartProds})
})
router.get('/realTimeProducts', async(req, res) => {
    res.render('realTimeProducts')
})

export default router