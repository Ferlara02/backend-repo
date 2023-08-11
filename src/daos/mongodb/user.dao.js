import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../utils.js";
export default class UserDao {
    async registerUser(user) {
        try {
            const {email, password} = user
            const userExist = await UserModel.findOne({email})
            if(!userExist) {
                const isAnAdmin = email === "admin@coder.com" && password === "admin1234"
                const newUser = await UserModel.create({
                    ...user,
                    password: createHash(password),
                    role: isAnAdmin ? "admin" : "user",
                })
                return newUser
            } else return false
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }

    async getById(id){
        try {
          const userExist = await UserModel.findById(id)
          if(userExist) return userExist
          else return false
        } catch (error) {
          console.log(error)
          // throw new Error(error)
        }
    }
    
    async getByEmail(email){
        try {
          const userExist = await UserModel.findOne({email}); 
          // console.log(userExist);
          if(userExist) return userExist
          else return false
        } catch (error) {
          console.log(error)
          throw new Error(error)
        }
    }
}