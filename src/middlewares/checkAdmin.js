import * as userService from "../services/user.services.js"


export const checkAdmin = async(req, res, next) => {
    try {
        const user = await userService.getById(req.session.passport?.user)
        if(!user) return res.status(400).json({msg: "Unauthorized"})
        const userRole = user.role
        if(userRole !== "admin" && userRole !== "premium")  return res.status(403).json({msg: "Unauthorized. No user admin."})
        next()
    } catch (error) {
        return res.status(401).json({msg: "Unauthorized"})
    }
}

