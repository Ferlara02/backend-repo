import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../../utils.js";
import CartDaoMongoDB from "./cart.dao.js";
const cartDao = new CartDaoMongoDB()
export default class UserDao {
    async registerUser(user, cart) {
        try {
            const {email, password} = user
            const userExist = await UserModel.findOne({email})
            if(!userExist) {
                const isAnAdmin = email === "admin@coder.com" && password === "admin1234"
                const newUser = await UserModel.create({
                    ...user,
                    password: createHash(password),
                    role: isAnAdmin ? "admin" : "user",
                    cart
                })
                return newUser
            } else return false
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async loginUser(user) {
        try {
            const {email, password} = user
            const userExist = await UserModel.findOne({email})
            if(userExist) {
                const passValid = isValidPassword(password, userExist)
                if(!passValid) return false
                else return userExist
            } 
            return false
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getById(id){
        try {
          const userExist = await UserModel.findById(id)
          if(userExist) return userExist
          else return false
        } catch (error) {
          throw new Error(error.message)
        }
    }
    
    async getByEmail(email){
        try {
          const userExist = await UserModel.findOne({email}); 
          // console.log(userExist);
          if(userExist) return userExist
          else return false
        } catch (error) {
          throw new Error(error.message)
        }
    }

    async addProdToUserCart(userId, prodId, quantity){
        try {
            const user = await UserModel.findById(userId);
            if(!user) return false;
            console.log("CART--->", user.cart);
            const productAdded = await cartDao.addProdToCart(user.cart, prodId, quantity)
            console.log(productAdded);
            user.save();
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}