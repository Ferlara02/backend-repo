import { Router } from "express";
const router = Router()
import { __dirname } from "../utils.js";
import * as prodService from "../services/product.services.js"
import * as cartService from "../services/cart.services.js"


router.get('/', async(req, res) => {
    const { page, limit, category, available, sort } = req.query

    const response = await prodService.getAll(page, limit, category, available, sort)

    const productsList = response.payload
    console.log(response);

    res.render('home', {productsList})
})
router.get("/cart/:id", async(req, res) => {
    const {id} = req.params
    const cart = await cartService.getById(id)
    const cartProds = cart.products
    console.log(cartProds);
    res.render("cart", {cartProds})
})
router.get('/realTimeProducts', async(req, res) => {
    res.render('realTimeProducts')
})

export default router