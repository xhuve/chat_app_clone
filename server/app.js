import Express from "express"
import http from 'http'
import { getUser, createUser } from "./database.js"
import { Server } from 'socket.io'
import cors from 'cors'
import bcrypt from 'bcrypt';

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

app.post("/register", (req, res) => {
    
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err){
            res.status(400).send("Problem creating account", err)
        }
        const user = await createUser(req.body.username, hash);
        if (!user)
            return res.status(400).send("Problem creating user")

        return res.status(200).json(user);
    })
})


app.post("/login", async (req, res) => {
    console.log("working")
    const [ user ] = await getUser(req.body.username);
    if (!user)
        return res.status(400).send("User not found")
    
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err)
            return res.status(400).send("Problem with logging in")
        return res.status(200).send("You logged in!")
    })
})

server.listen(3001, () => console.log("Server is listening"));
