import { Router } from "express";
const router = Router();
import { __dirname } from "../utils.js";

// import { uploader } from "../middlewares/multer.js";
// import { socketServer } from "../app.js";

import * as controller from "../controllers/product.controllers.js"
import { checkAdmin } from "../middlewares/checkAdmin.js";
import { checkAuth } from "../middlewares/isAuth.js";


router.get("/", controller.getAll)
router.get("/:id", controller.getById)
router.get("/dto/:id", controller.getByIdDTO)
router.post("/mockingproducts", controller.createMock)
router.post("/", checkAuth, checkAdmin, controller.create)
router.post("/dto", checkAdmin, controller.createProdDTO)
router.put("/:id", checkAdmin, controller.update)

router.delete("/:id", checkAdmin, controller.remove)

export default router;


