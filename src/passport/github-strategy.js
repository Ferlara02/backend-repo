import {Strategy as GithubStrategy} from "passport-github2"
import passport from "passport"
import * as service from "../services/user.services.js"

const strategyOptions = {
    clientID: "Iv1.ec5b9aa6bfca8482",
    clientSecret: "8df468dddfd587a4fc875307aac024f7188a9951",
    callbackURL: "http://localhost:8080/users/profile-github"
}

const registerOrLogin = async(accessToken, refreshToken, profile, done) => {
    console.log("profile:", profile);
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog
    const user = await service.getByEmail(email)
    if(user) return done(null, user)
    const newUser = await service.registerUser({
        first_name: profile._json.name.split(" ")[0],
        last_name: profile._json.name.split(" ")[1],
        email,
        password: "",
        isGithub: true
    })
    return done(null, newUser)
}

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin))