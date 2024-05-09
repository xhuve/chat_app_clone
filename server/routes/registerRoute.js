import bcrypt from 'bcrypt'
import { createUser } from '../database.js'

export const registerRoute = (req, res) => {
    
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err){
            res.status(400).send("Problem creating account", err)
        }
        const user = await createUser(req.body.username, hash);
        if (!user) {
            console.log(user)
            return res.status(400).send("Problem creating user")
        }

        return res.status(200).json(user);
    })
}