import express from 'express';
import productsRouter from './routes/products.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(errorHandler)


app.use('/products', productsRouter)


app.listen(8080, () => {
    console.log('Server ok on port 8080');
})