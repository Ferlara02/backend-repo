import { Router } from "express";
import * as controller from "../controllers/user.controllers.js"
const router = Router()

router.post("/register", controller.registerUser)
router.post("/login", controller.loginUser)
router.get("/logout", controller.logout)

export default router