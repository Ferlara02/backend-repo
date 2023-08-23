import passport from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import * as service from "../services/user.services.js"
import * as cartService from "../services/cart.services.js"

const strategyOptions = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}
//logica registro
const register = async (req, email, password, done) => {
    try {
        const user = await service.getByEmail(email)
        if(user) return done(null, false)
        const cart = await cartService.create()
        const newUser = await service.registerUser(req.body, cart)
        return done(null, newUser)
    } catch (error) {
        console.log(error);
    }
}

//logica login
const login = async (req, email, password, done) => {
    try {
        const user = {email, password}
        const userLogin = await service.loginUser(user)
        console.log(userLogin);
        if(!userLogin) return done(null, false, {message: "User not found"})
        return done(null, userLogin)
    } catch (error) {
        console.log(error);
    }
}
//strategies
const registerStrategy = new LocalStrategy(strategyOptions, register)
const loginStrategy = new LocalStrategy(strategyOptions, login)

//inicializacion
passport.use("login", loginStrategy)
passport.use("register", registerStrategy)

//serialize y deserialize
//guarda al usuario en req.session.passport
//req.session.passport.user --> info del usuario
passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser(async(id, done) => {
    const user = await service.getById(id)
    return done(null, user)
})