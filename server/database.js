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
    return (res);
}
