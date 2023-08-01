import { Router } from "express";
const router = Router();
import {__dirname} from "../utils.js";

import * as controller from "../controllers/cart.controllers.js";

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.post("/:id/products/:prodId", controller.addProdToCart);
router.put("/:id", controller.updateCartProducts);
router.put("/:idCart/products/:idProd", controller.updQtyProdInCart);
router.delete("/:id/products/:idProd", controller.deleteProdFromCart)
router.delete("/:id", controller.remove)


export default router