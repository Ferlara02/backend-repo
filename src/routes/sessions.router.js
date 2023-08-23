import { Router } from "express";
import passport from "passport";
import * as userService from "../services/user.services.js"

const router = Router();

router.get("/current", async(req, res) => {
    const user = await userService.getById(req.session.passport?.user)
    console.log("--> CURRENT USER --> ", user);
    res.json({ user });
  }
);

export default router;