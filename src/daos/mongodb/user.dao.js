import { UserModel } from "./models/user.model.js";

export default class UserDao {
    async registerUser(user) {
        try {
            const {email, password} = user
            const userExist = await UserModel.findOne({email})
            if(!userExist) {
                const isAnAdmin = email === "admin@coder.com" && password === "admin1234"
                const newUser = await UserModel.create({
                    ...user,
                    role: isAnAdmin? "admin" : "user",
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
            const userExist = await UserModel.findOne({email, password})
            return userExist ? userExist : false
        } catch (error) {
            console.log(error);
        }
    }
}