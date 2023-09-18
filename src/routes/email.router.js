import { Router } from "express";
import { sendMailEthereal } from "../controllers/email.controllers.js";
const router = Router()

router.post("/send", sendMailEthereal)

export default router