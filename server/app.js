import Express from "express"
import http from 'http'
import cors from 'cors'
import cookieParser from "cookie-parser"
import { Server } from 'socket.io'
import { registerRoute } from "./routes/registerRoute.js"
import { loginRoute } from "./routes/loginRoute.js"
import { verifyToken } from "./routes/verifyToken.js"
import { refreshTokenCheck } from "./routes/refreshTokenCheck.js"

const app = Express();
app.use(Express.json())
app.use(cors( {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
    credentials: true
}))
app.use(cookieParser())

const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"],
//         credentials: true
//     }
// });

// io.on("connection", (socket) => {
//     console.log("User connected: " + socket.id)
    
//     socket.on("send_message", (data) => {
//         socket.broadcast.emit("recieve_message", data);
//     })
// })

app.post("/register", registerRoute)

app.post("/login", loginRoute)

app.post("/refresh", refreshTokenCheck)

app.post("/verify", verifyToken)

server.listen(3001, () => console.log("Server is listening"));
