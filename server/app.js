import Express from "express"
import http from 'http'
import { getUser, createUser } from "./database.js"
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
    const user = await createUser(req.body.username, req.body.password);
    if (!user)
        return res.status(400).send("Problem creating user")

    return res.status(200).json(user);
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
