import {Strategy as GithubStrategy} from "passport-github2"
import passport from "passport"
import * as service from "../services/user.services.js"
import * as cartService from "../services/cart.services.js"
import config from "../config.js"


const strategyOptions = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/users/profile-github"
}

const registerOrLogin = async(accessToken, refreshToken, profile, done) => {
    
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog
    const user = await service.getByEmail(email)
    if(user) {
        user.last_connection = Date.now()
        user.save()
        return done(null, user)
    }
    const newUser = await service.registerUser({
        first_name: profile._json.name.split(" ")[0],
        last_name: profile._json.name.split(" ")[1],
        email,
        password: "",
        cart: await cartService.create(),
        isGithub: true
    })
    return done(null, newUser)
}

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin))