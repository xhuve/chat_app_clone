import Express from "express"
import http from 'http'
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





server.listen(3001, () => console.log("Server is listening"));