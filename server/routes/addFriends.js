import { addFriendDB, getUser } from "../database.js"


export const addFriends = async (req, res) => {
    try {
        const [ result ] = await getUser(req.body.friendName)
        await addFriendDB(req.body.user_id, result.user_id)
        res.status(201).send(["Friend Added", result])
    } catch (error) {
        res.status(400).send(error)
    }
}