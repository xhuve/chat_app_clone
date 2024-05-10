import "dotenv/config"
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const { token } = req.cookies
    console.log(req.cookies)

    if (token){
        const user = jwt.verify(token, process.env.SESSION_TOKEN)
        req.user = user
        next()
    } else {
        res.clearCookie("token")
        return res.status(401).send("Unauthorized")
    }
}