import Express from "express"
import http from 'http'
<<<<<<< HEAD
import { getUser, createUser } from "./database.js"
=======
import { getUser } from "./database.js"
>>>>>>> 45ec09b (Add very basic functionalities for register and login along with endpoints)
import { Server } from 'socket.io'
import cors from 'cors'

const app = Express();
app.use(Express.json())
app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected: " + socket.id)
    
    socket.on("send_message", (data) => {
        socket.broadcast.emit("recieve_message", data);
    })
})

app.post("/register", async (req, res) => {
    const user = await createUser("billy");
    if (!user)
        return Bad("Problem creating user")

    return Ok(user);
})

app.post("/login", async (req, res) => {
    const user = await getUser("billy");
    if (!user)
        return Bad("User not found")

    if (req.password == user.password)
        return Ok(user);
    else
        return Bad("Incorrect password")
})

app.post("/login", async (req, res) => {
    const user = await getUser(req.body.username);
    if (!user)
        return res.status(400).send("User not found")

    if (req.password == user.password)
        return res.status(200).json(user);
    else
        return res.status(400).send("Incorrect password")
})

server.listen(3001, () => console.log("Server is listening"));
