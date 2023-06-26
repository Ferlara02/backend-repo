import { Router } from "express";
const router = Router();
import { __dirname } from "../utils.js";

import ProductManager from "../manager/productManager.js";
const productManager = new ProductManager(__dirname + '/db/products.json')


router.get('/', async(req, res, next) => {
    try {
        const {limit} = req.query
        const products = await productManager.getProducts()
        if(limit){
            const prodSlice = products.slice(0, Number(limit))
            res.status(200).json(prodSlice)
        } else {
            res.status(200).json(products)
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:pid', async(req, res, next) => {
    try {
        const {pid} = req.params

        const prod = await productManager.getProductById(Number(pid))
        
        if(prod) {
            res.status(200).json(prod)
        } else {
            res.status(400).json({message: `Product ${pid} no encontrado.`})
        }

    } catch (error) {
        next(error)
    }
})

router.post('/', async(req, res, next) => {
    try {
        const product = req.body
        const productAdded = await productManager.addProduct(product)
        res.status(200).json(productAdded)
    } catch (error) {
        next(error)
    }
})

router.put('/:idProd', async(req, res, next) => {
    try {
        const prod = req.body
        const {idProd} = req.params
        const prodExists = await productManager.getProductById(Number(idProd))

        if(prodExists) {
            await productManager.updateProduct(Number(idProd), prod)
            res.status(200).json(`Product ${idProd} updated.`)
        } else {
            res.status(400).json({msg: `Prod ${idProd} does not exists.`})
        }
    } catch (error) {
        next(error)
    }
})

router.delete('/:idProd', async(req, res, next) => {
    try {
        const {idProd} = req.params
        const prodExists = await productManager.getProductById(Number(idProd))
        if(prodExists) {
            await productManager.deleteProduct(Number(idProd))
            res.status(200).json(`Product ${idProd} deleted.`)
        } else {
            res.status(400).json({msg: `Prod ${idProd} does not exists.`})
        }

    } catch (error) {
        next(error)
    }
})

export default router;