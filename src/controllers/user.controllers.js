import * as service from "../services/user.services.js"
import persistence from "../persistence/daos/factory.js"
const {userDao} = persistence
import { addProdToCart } from "../services/cart.services.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()

import { sendMail } from "../services/email.service.js";
import { logger } from "../utils/winston.config.js";



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
        if(!tokenResetPass) return httpResponse.NotFound(res, 'Email not send')
        res.cookie('tokenpass', tokenResetPass)
        return httpResponse.Ok(res, {msg: 'Email reset password send OK'})
    } catch (error) {
        next(error.message)
    }
}

export const getAll = async(req, res, next) => {
    try {
        const users = await userDao.getAll()
        if (!users) return httpResponse.NotFound(res, "Users in DB cant be found.")
        return httpResponse.Ok(res, users)
    } catch (error) {
        next(error.message)
    }
}

export const updatePass = async(req, res, next) => {
    try {
        const user = await service.getById(req.session.passport?.user)
        const {pass} = req.body
        const {tokenpass} = req.cookies
        if(!tokenpass) return httpResponse.Forbidden(res, "Token expired")
        const updPass = await service.updatePass(user, pass)
        if(!updPass) return httpResponse.NotFound(res, "Password cant be equal to previous passwords.")
        res.clearCookie("tokenpass")
        return httpResponse.Ok(res, updPass)
    } catch (error) {
        next(error.message)
    }
}

export const deleteUsers = async (req, res, next) => {
    try {
        const date = new Date()
        const dateFiltered = date.setDate(date.getDate() - 2)
        const allUsers = await userDao.getAll()
        const usersToDelete = allUsers.filter(user => user.last_connection < dateFiltered)
        if(usersToDelete.length !== 0) {
            const usersID = usersToDelete.length === 1 ? usersToDelete[0]._id.toString() : usersToDelete.map(user => user._id)
            logger.info(usersID)
            usersToDelete.length === 1 ? await userDao.deleteOne(usersID) : await userDao.deleteMany(usersID)
            usersToDelete.map(async user => await sendMail(user, ""))
            return httpResponse.Ok(res, {msg: "User/s were deleted", data: usersToDelete})
        } else {
            return httpResponse.NotFound(res, "There are no users to delete.")
        }  
    } catch (error) {
        next(error.message)
    }
}

export const changeRoleToPremium = async (req, res, next) => {
    try {
        const {id} = req.params
        const user = await userDao.getById(id)

        if(user && user.role === "user") {
            const changeRole = await userDao.changeRole(id)
            return httpResponse.Ok(res, `User ${id} role changed to ${changeRole}`)
        } else return httpResponse.NotFound(res, "User must be no premium")

    } catch (error) {
        next(error.message)
    }
}
