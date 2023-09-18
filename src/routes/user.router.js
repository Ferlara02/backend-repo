import { Router } from "express";
import passport from "passport"
import * as controller from "../controllers/user.controllers.js"
import { checkAdmin } from "../middlewares/checkAdmin.js";
import { checkAuth } from "../middlewares/isAuth.js";
const router = Router()

router.post("/register", passport.authenticate("register", {
    successRedirect: '/login',
    failureRedirect: '/error-auth-to-register',
    passReqToCallback: true 
}))

router.post("/login", passport.authenticate("login", {
    successRedirect: '/products',
    failureRedirect: '/error-auth-to-login',
    passReqToCallback: true 
}))

router.get("/logout", controller.logout)

//auth w/github
router.get("/register-github", passport.authenticate("github", {scope: ["user:email"]}))

router.get("/profile-github", passport.authenticate("github", {
    failureRedirect: "/error-auth-to-login",
    successRedirect: "/products",
    passReqToCallback: true //para que a este endpoint: (/profile) le llegue el objeto req
}))

router.post('/add/:idProd/quantity/:quantity', checkAuth,controller.addProdToUserCart)

export default router