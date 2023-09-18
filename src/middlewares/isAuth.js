
export const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next() 
    res.status(400).json({msg: "Unauthorized"})
}