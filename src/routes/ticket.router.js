import { Router } from "express";
import * as controller from "../controllers/ticket.controller.js"
import { checkAuth } from "../middlewares/isAuth.js";

const router = Router()

router
    .post("/", checkAuth, controller.generateTicket)

export default router