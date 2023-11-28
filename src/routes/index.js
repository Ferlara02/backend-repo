import { Router } from "express";
import productsRouter from './products.router.js';
import cartsRouter from './cart.router.js'
import viewsRouter from './views.router.js'
import ticketRouter from "./ticket.router.js"
import userRouter from "./user.router.js"
import sessionRouter from "./sessions.router.js"
import emailRouter from "./email.router.js"
import loggerRouter from "./logger.router.js"

export default class GetAllRoutes {
    constructor () {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.use('/', viewsRouter)
        this.router.use('/api/products', productsRouter)
        this.router.use('/api/carts', cartsRouter)
        this.router.use("/users", userRouter)
        this.router.use("/api/sessions", sessionRouter)
        this.router.use("/api", emailRouter)
        this.router.use("/api/ticket", ticketRouter)
        this.router.use("/winston", loggerRouter)
    }

    getRoutes() {
        return this.router;
    }

};


