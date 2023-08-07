import * as service from "../services/user.services.js"

export const registerUser = async(req, res) => {
    try {
        const user = req.body
        const userRegistered = await service.registerUser(user)
        if(userRegistered) res.redirect("/login")
        else res.redirect("/error-auth-to-register")
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async(req, res) => {
    try {
        const user = req.body
        const userLogin = await service.loginUser(user)
        if(userLogin) {
            req.session.user = userLogin
            res.redirect("/products")
        } else res.redirect("/error-auth-to-login")
    } catch (error) {
        console.log(error);
    }
}

export const logout = (req, res) => {
    req.session.destroy()
    res.redirect("/login")
}