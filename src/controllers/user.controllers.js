import * as service from "../services/user.services.js"
import UserDao from "../persistence/daos/mongodb/user.dao.js"
import { addProdToCart } from "../services/cart.services.js";
import { HttpResponse } from "../utils/http.response.js";

const userDao = new UserDao()


export const registerUser = async(req, res, next) => {
    try {
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

export const addProdToUserCart = async(req, res, next) => {
    try {
        const _id = req.session.passport?.user;
        console.log("USER--->", req.session.passport?.user);
        const { idProd } = req.params;
        const { quantity } = req.params;
        const newProdToUserCart = await service.addProdToUserCart(_id, idProd, Number(quantity));
        if(!newProdToUserCart) res.status(404).json({msg: 'Error add product to user cart'})
        res.status(200).json(newProdToUserCart);
    } catch (error) {
        next(error.message);
    }
    
}

export const resetPass = async(req, res, next) => {
    try {
        const user = await service.getById(req.session.passport?.user)

        const tokenResetPass = await service.resetPass(user)
        if(!tokenResetPass) return HttpResponse.NotFound(res, 'Email not send')
        res.cookie('tokenpass', tokenResetPass)
        return HttpResponse.Ok(res, {msg: 'Email reset password send OK'})
    } catch (error) {
        next(error.message)
    }
}

export const updatePass = async(req, res, next) => {
    try {
        const user = await service.getById(req.session.passport?.user)
        const {pass} = req.body
        const {tokenpass} = req.cookies
        if(!tokenpass) return HttpResponse.Forbidden(res, "Token expired")
        const updPass = await service.updatePass(user, pass)
        if(!updPass) return HttpResponse.NotFound(res, "Password cant be equal to previous passwords.")
        res.clearCookie("tokenpass")
        return HttpResponse.Ok(res, updPass)
    } catch (error) {
        next(error.message)
    }
}