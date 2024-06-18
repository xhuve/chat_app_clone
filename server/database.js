import mysql from 'mysql2'

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "a",
    database: "ChatApp"
}).promise();

export const getUser = async (name) => {
    try {
        const [ res ] = await pool.query(`SELECT * FROM User WHERE username = "${name}"`)
        return res;
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const createUser = async (name, password) => {
    const [ res ] = await pool.query(`INSERT INTO User (username, password) VALUES ("${name}", "${password}")`)
    return res;
}

export const addFriendDB = async (user1, user2) => {
    const [ res ] = await pool.query(`INSERT INTO Friends (user_id1, user_id2) VALUES ("${user1}", "${user2}")`)
    return res
}

export const getFriendsDB = async (userid) => {
    const res = await pool.query(`SELECT User.*
    FROM User
    LEFT JOIN Friends ON User.user_id = Friends.user_id2
    WHERE Friends.user_id1 = '${userid}'`)

    return res
}

export const createMessageDB = async (user1, user2, message) => {
    const res = await pool.query(`INSERT INTO Messages (userId1, userId2, messages) VALUES (${user1}, ${user2}, '${JSON.stringify(message)}')`);
    return res;
}

export const getMessagesDB = async (user1, user2) => {
    const res = await pool.query(`
        SELECT messages 
        FROM Messages 
        WHERE (userId1 = ${user1} AND userId2 = ${user2}) OR (userId1 = ${user2} AND userId2 = ${user1})
    `);

    return res;
}

export const updateMessageDB = async (user1, user2, message) => {
    const res = await pool.query(`
        UPDATE Messages
        SET messages = '${JSON.stringify(message)}'
        WHERE (userId1 = ${user1} AND userId2 = ${user2}) OR (userId1 = ${user2} AND userId2 = ${user1})
    `);

    return res;
}

export const deleteMessageDB = async (user1, user2) => {
    const [res] = await pool.query(`
        DELETE FROM Messages
        WHERE (userId1 = ${user1} AND userId2 = ${user2}) OR (userId1 = ${user2} AND userId2 = ${user1})
    `);

    return res;
}