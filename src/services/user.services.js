import UserDao from "../daos/mongodb/user.dao.js";

const userDao = new UserDao()

export const registerUser = async(user) => {
    try {
        const newUser = await userDao.registerUser(user)
        return newUser 
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async(user) => {
    try {
        const userExist = await userDao.loginUser(user)
        return userExist
    } catch (error) {
        console.log(error);
    }
}

export const getByEmail = async(email) => {
    try {
        const userExist = await userDao.getByEmail(email)
        return userExist
    } catch (error) {
        console.log(error);
    }
}

export const getById = async(id) => {
    try {
        const userExist = await userDao.getById(id)
        return userExist
    } catch (error) {
        console.log(error);
    }
}