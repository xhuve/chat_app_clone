import bcrypt from "bcrypt"
import { getUser } from "../database.js"
import jwt from "jsonwebtoken"
import "dotenv/config"

export const loginRoute = async (req, res) => {
    const [ user ] = await getUser(req.body.username)

    if (!user)
        return res.status(400).send("User not found")

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err)
            return res.status(400).send("Problem with logging in")

        const sessionToken = jwt.sign(user, process.env.SESSION_TOKEN, {expiresIn: "1h"}) 
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: "10h"})

        res.cookie("rToken", refreshToken, { httpOnly: true })
        res.status(200).send(sessionToken)
        return result
    })
}