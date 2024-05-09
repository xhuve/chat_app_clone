import Express from "express"
import http from 'http'
import { getUser, createUser } from "./database.js"
import { Server } from 'socket.io'
import cors from 'cors'
import bcrypt from 'bcrypt';
import { registerRoute } from "./routes/registerRoute.js"
import { loginRoute } from "./routes/loginRoute.js"

const app = Express();
app.use(Express.json())
app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected: " + socket.id)
    
    socket.on("send_message", (data) => {
        socket.broadcast.emit("recieve_message", data);
    })
})

app.post("/register", registerRoute)

app.post("/login", loginRoute)

server.listen(3001, () => console.log("Server is listening"));
