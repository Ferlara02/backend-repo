import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';

import ProductManager from './manager/productManager.js';
const productManager = new ProductManager(__dirname + '/db/products.json')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))
app.use(errorHandler)


//set handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const httpServer = app.listen(8080, () => {
    console.log('Server ok on port 8080');
})

export const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket) => {
    console.log('¡New connection!', socket.id);

    socketServer.emit('products', await productManager.getProducts())

})