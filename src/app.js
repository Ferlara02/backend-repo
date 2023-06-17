import express from 'express';
import ProductManager from './manager/productManager.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager('./src/products.json')

/* ------------------------------------ - ----------------------------------- */

app.get('/products', async(req, res) => {
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
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:pid', async(req, res) => {
    try {
        const {pid} = req.params

        const prod = await productManager.getProductById(Number(pid))
        
        if(prod) {
            res.status(200).json(prod)
        } else {
            res.status(400).json({message: `Product ${pid} no encontrado.`})
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.listen(8080, () => {
    console.log('Server ok on port 8080');
})