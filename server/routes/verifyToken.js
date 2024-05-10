import "dotenv/config"
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const { token } = req.value

    if (token){
        jwt.verify(token, process.env.SESSION_TOKEN, (err, decoded) => {
            if (err)
                return res.status(403).send("Refresh")
            req.user = decoded
            next()
        })
    } else
        return res.status(401).send("Unauthorized")
}