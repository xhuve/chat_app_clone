import Express from "express"
import http from 'http'
import { getUser } from "./database.js"
import { Server } from 'socket.io'
import cors from 'cors'

const app = Express();
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


server.listen(3001, () => console.log("Server is listening"));
