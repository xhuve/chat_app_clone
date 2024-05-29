import { addFriendDB, getUser } from "../database.js"


export const addFriends = async (req, res) => {
    const [ result ] = await getUser(req.body.friendName)
    try {
        addFriendDB(req.body.userId, result.user_id)
        res.status(201).send("Friend Added")
    } catch (error) {
        res.status(400).send(error)
    }
}