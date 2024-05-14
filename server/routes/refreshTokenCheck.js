import jwt from "jsonwebtoken"
import "dotenv/config"

export const refreshTokenCheck = (req, res) => {
    jwt.verify(req.cookies.rToken, process.env.REFRESH_TOKEN, (err, decoded) => {
        if (err)
            return res.status(403).send("Please log in again")
        res.cookies = jwt.sign(decoded, process.env.SESSION_TOKEN)
    })
}