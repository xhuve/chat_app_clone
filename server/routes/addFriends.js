import { addFriendDB, getUser } from "../database.js"


export const addFriends = async (req, res) => {
    const [ result ] = await getUser(req.body.friendName)
    addFriendDB(req.body.userId, result.user_id)
    res.status(201).send("Friend Added")
}