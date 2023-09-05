import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import "./daos/mongodb/connection.js"
import ProductManager from './daos/filesystem/product.dao.js';
import userRouter from "./routes/user.router.js"
import sessionRouter from "./routes/sessions.router.js"
import { connectionString } from './daos/mongodb/connection.js';
import passport from 'passport';
import './passport/local-strategy.js';
import "./passport/github-strategy.js"
import {Command} from "commander"
import cors from "cors"

const productManager = new ProductManager(__dirname + '/db/products.json')

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: "123",
        },
    }),
    secret: "123",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
    },
}

const app = express()

const commander = new Command()
commander
    .option("-p <port>", "port server", 8080)
    .option("-m <mode>", "mode server", "dev")

commander.parse()

app.use(cors({credentials: true, origin: "http://localhost:8080/"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))
app.use(errorHandler)


//set handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(cookieParser())
app.use(session(mongoStoreOptions))

app.use(passport.initialize());
app.use(passport.session());


app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use("/users", userRouter);
app.use("/api/sessions", sessionRouter);

const PORT = commander.opts().p
const mode = commander.opts().m


const httpServer = app.listen(PORT, () => {
    console.log(`Server ok on port ${PORT}, mode: ${mode}}`);
})

export const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket) => {
    console.log('¡New connection!', socket.id);

    socketServer.emit('products', await productManager.getProducts())

})