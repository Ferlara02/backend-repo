import * as service from "../services/user.services.js"
import UserDao from "../daos/mongodb/user.dao.js"
const userDao = new UserDao()
// export const registerUser = async(req, res) => {
//     try {
//         const user = req.body
//         const userRegistered = await service.registerUser(user)
//         if(userRegistered) res.redirect("/login")
//         else res.redirect("/error-auth-to-register")
//     } catch (error) {
//         console.log(error);
//     }
// }


export const registerUser = async(req, res, next) => {
    try {
        console.log("Message:", req.session);
        console.log("passport:", req.session.passport);
        console.log("user:", req.session.passport.user);
        console.log("REQ--->>", req);
        if(req.session.passport.user) res.redirect("/login")
        else res.redirect("/error-auth-to-register")
    } catch (error) {
        next(error.message);
    }
}

// export const loginUser = async(req, res) => {
//     try {
//         const user = req.body
//         const userLogin = await service.loginUser(user)
//         if(userLogin) {
//             req.session.user = userLogin
//             res.redirect("/products")
//         } else res.redirect("/error-auth-to-login")
//     } catch (error) {
//         console.log(error);
//     }
// }

export const loginUser = async(req, res, next) => {
    try {
        const user = await userDao.getById(req.session.passport.user)
        console.log(user);
        if(user){
            res.redirect("/products")
        } else res.redirect("/error-auth-to-login")
    } catch (error) {
        console.log(error);
        next(error.message);
    }
}

export const logout = (req, res) => {
    req.session.destroy()
    res.redirect("/login")
}

export const githubResponse = async (req, res ,next) => {
    try {
        const {first_name, last_name, email, isGithub} = req.user
        res.redirect("/products")
    } catch (error) {
        next(error.message)
    }
}