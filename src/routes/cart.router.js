import { Router } from "express";
const router = Router();
import {__dirname} from "../utils.js";

import * as controller from "../controllers/cart.controllers.js";

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id/product/:prodId", controller.addProdToCart);
router.delete("/:id", controller.remove)


export default router