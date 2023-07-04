import { Router } from "express";
const router = Router()
import { __dirname } from "../utils.js";
import ProductManager from "../manager/productManager.js";
const productManager = new ProductManager(__dirname + '/db/products.json')


router.get('/', async(req, res) => {
    const productsList = await productManager.getProducts();
    res.render('home', {productsList})
})

router.get('/realTimeProducts', async(req, res) => {
    res.render('realTimeProducts')
})

export default router