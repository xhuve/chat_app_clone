import mysql from 'mysql2'

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "a",
    database: "ChatApp"
}).promise();

<<<<<<< HEAD
export const getUser = async (name) => {
    const [ res ] = await pool.query(`SELECT * FROM Users WHERE username = "${name}"`)
    if (!res)
        return ("error")
    return (res);
}

export const createUser = async (name, password) => {
    const [ res ] = await pool.query(`INSERT INTO Users (username, password) VALUES ("${name}", "${password}")`)
    return (res);
}
=======
const res = await pool.query("SELECT * FROM Users")

console.log(res)
>>>>>>> ce8b5f6 (Adding db)
