import Express from "express"
import http from 'http'
import cors from 'cors'
import cookieParser from "cookie-parser"
import { Server } from 'socket.io'
import { registerRoute } from "./routes/registerRoute.js"
import { loginRoute } from "./routes/loginRoute.js"
import { verifyToken } from "./routes/verifyToken.js"
import { refreshTokenCheck } from "./routes/refreshTokenCheck.js"
import { addFriends } from "./routes/addFriends.js"
import { createMessageDB, getFriendsDB, getMessagesDB, updateMessageDB } from './database.js'

const app = Express();
app.use(Express.json())
app.use(cors( {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
    credentials: true
}))
app.use(cookieParser())

let onlineUsers = []

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    socket.on("addNewUser", (userId) => {
        if (!onlineUsers.some(user => user.userId === userId)) {
            onlineUsers.push({ userId, socketId: socket.id });
        }
        io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("sendMessage", ({ senderId, receiverId, message, date }) => {
        const receiver = onlineUsers.find(user => user.userId === receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("receiveMessage", {
                senderId,
                message,
                date
            });
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });
});
app.post("/register", registerRoute)

app.post("/login", loginRoute)

app.post("/refresh", refreshTokenCheck)

app.post("/verify", verifyToken, (req, res) => {
    res.send(req.user)
})

app.post("/api/add_friends", addFriends)

app.post("/api/load_friends", async (req, res) => {
    const [ result ] = await getFriendsDB(req.body.userId)
    if (result == undefined)
        res.status(200).send([])
    else
        res.status(200).send(result)
})

app.post("/api/get_messages", async (req, res) => {
    const result = await getMessagesDB(req.body.userId1, req.body.userId2)
    if (!result) {
        res.status(200).send("Empty")
        return;
    }
    res.status(200).send(result[0][0].messages)
})

app.post("/api/send_message", async (req, res) => {
    try {
        const messages = await getMessagesDB(req.body.userId1, req.body.userId2)
        let result;
        if (messages[0].length === 0) {
            console.log("Creating message")
            result = await createMessageDB(req.body.userId1, req.body.userId2, req.body.message)
        } else {
            console.log("Updating message")
            console.log("🚀 ~ app.post ~ req.body.userId1, req.body.userId2, req.body.message:", req.body.userId1, req.body.userId2, req.body.message)
            result = await updateMessageDB(req.body.userId1, req.body.userId2, req.body.message)
        }
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})


server.listen(3001, () => console.log("Server is listening", 3001));
