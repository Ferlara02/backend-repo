import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import "dotenv/config"
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import "./persistence/daos/mongodb/connection.js"
import ProductManager from './persistence/daos/filesystem/product.dao.js';

import { connectionString } from './persistence/daos/mongodb/connection.js';
import passport from 'passport';

import './passport/local-strategy.js';
import "./passport/github-strategy.js"
import {Command} from "commander"
import cors from "cors"
import { HttpResponse } from './utils/http.response.js';
const httpResponse = new HttpResponse()
import config from './config.js';

import swaggerUI from "swagger-ui-express"
import swaggerJSDoc from 'swagger-jsdoc';
import { info } from './docs/info.js';

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

const specs = swaggerJSDoc(info)



const commander = new Command()
commander
    .option("-p <port>", "port server", 8080)
    .option("-m <mode>", "mode server", "dev")

commander.parse()


app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use(cors({credentials: true, origin: "http://localhost:8080/"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))



//set handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(cookieParser(config.SECRET_COOKIES))
app.use(session(mongoStoreOptions))

app.use(passport.initialize());
app.use(passport.session());

// Ruteos
import GetAllRoutes from './routes/index.js';
const allRoutes = new GetAllRoutes()
app.use("/", allRoutes.getRoutes())

app.use(errorHandler) //middleware que ataja todos los errores

const PORT = commander.opts().p
const mode = commander.opts().m


const httpServer = app.listen(process.env.PORT, () => {
    console.log(`Server ok on port ${PORT}, mode: ${mode}}`);
})

export const socketServer = new Server(httpServer);

socketServer.on('connection', async(socket) => {
    console.log('¡New connection!', socket.id);

    socketServer.emit('products', await productManager.getProducts())

})