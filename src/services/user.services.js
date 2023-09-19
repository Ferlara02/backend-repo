import persistence from "../persistence/daos/factory.js"
const {userDao, prodDao} = persistence

export const registerUser = async(user, cart) => {
    try {
        const newUser = await userDao.registerUser(user, cart)
        return newUser 
    } catch (error) {
        throw new Error(error.message);
    }
}

export const loginUser = async(user) => {
    try {
        const userExist = await userDao.loginUser(user)
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