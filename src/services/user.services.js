import persistence from "../persistence/daos/factory.js"
import { sendMail } from "./email.service.js"
const {userDao, prodDao} = persistence

export const registerUser = async(user, cart) => {
    try {
        const newUser = await userDao.registerUser(user, cart)
        await sendMail(user, "register")
        return newUser 
    } catch (error) {
        throw new Error(error.message);
    }
}

export const loginUser = async(user) => {
    try {
        const userExist = await userDao.loginUser(user)
        if(userExist) {
            userExist.last_connection = Date.now()
            userExist.save()
        }
        return userExist
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getByEmail = async(email) => {
    try {
        const userExist = await userDao.getByEmail(email)
        return userExist
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getById = async(id) => {
    try {
        const userExist = await userDao.getById(id)
        return userExist
    } catch (error) {
        throw new Error(error.message);
    }
}

export const addProdToUserCart = async(userId, prodId, quantity) => {
    try {
        const existProd = await prodDao.getById(prodId);
        if(!existProd) return false;
        return userDao.addProdToUserCart(userId, prodId, quantity);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const resetPass = async(user) => {
    try {
        const token = await userDao.resetPass(user)
        if(!token) return false
        return await sendMail(user, "resetPass", token)
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updatePass = async(user, pass) => {
    try {
        return await userDao.updatePass(user, pass)
    } catch (error) {
        throw new Error(error.message)
    }
}