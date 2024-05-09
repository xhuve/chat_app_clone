import bcrypt from "bcrypt"
import { getUser } from "../database.js";

export const loginRoute = async (req, res) => {
    const [ user ] = await getUser(req.body.username);
    if (!user)
        return res.status(400).send("User not found")
    
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err)
            return res.status(400).send("Problem with logging in")
        return res.status(200).send("You logged in!")
    })
}