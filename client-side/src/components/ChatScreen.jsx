import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { socketio } from '../socket.js';

const ChatScreen = () => {

    const [chatWith, setChatWith] = useState([])
    const [friendBar, setFriendBar] = useState(false)
    const [friendSearch, setFriendSearch] = useState("")
    const [allFriends, updateFriends] = useState({ usernames: [], userIds: [] })
    const [message, setMessage] = useState("")
    const [isOnline, setOnline] = useState([])
    const [allMessages, setAllMessages] = useState([])
    const [socket, setSocket] = useState(null)
    const nav = useNavigate()

    useEffect(() => {
        const newSocket = socketio.connect("http://localhost:3001")
        setSocket(newSocket)

        return () => {
            newSocket.disconnect();
        }
    }, [])

    useEffect(() => {
        if (socket === null) return;
        socket.on('connect', () => {
            socket.emit("addNewUser", JSON.parse(sessionStorage.getItem('user')).username)
    
            socket.on("getOnlineUsers", (res) => {
                setOnline(res)
            })
            socket.on("receiveMessage", (data) => {
                setAllMessages((prevMessages) => [...prevMessages, data].sort((a, b) => a.date - b.date))
            })
        })
    }, [socket])

    // useEffect(() => {
    //     setAllMessages((prevMessages) => [...prevMessages].sort((a, b) => a.date - b.date))
    // }, [allMessages])
    
    useEffect(() => {
        axios.post("http://localhost:3001/verify", { token: localStorage.getItem("s_token")})
        .then((verifyRes) => {
            sessionStorage.setItem("user", JSON.stringify(verifyRes.data))
            axios.post("http://localhost:3001/api/load_friends", { userId: verifyRes.data.user_id})
            .then((friendResult) => {
                const usernames = friendResult.data.map(x => x.username)
                const user_ids = friendResult.data.map(x => x.user_id)
                updateFriends({usernames: usernames, userIds: user_ids})
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
            nav("/")
        })
    }, [])

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        if (user && chatWith.length !== 0){
            const dataToSend = {userId1: user.user_id, userId2: chatWith[1]}
            axios.post('http://localhost:3001/api/get_messages', dataToSend)
            .then((messages) => {
                console.log("🚀 ~ .then ~ messages: Here", messages)
                if (messages.data != "Empty"){
                    setAllMessages(messages.data.sort((a, b) => a.date - b.date))}
                else
                    setAllMessages([])
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [chatWith])

    const handleAddFriend = () => {
        axios.post("http://localhost:3001/api/add_friends", { friendName: friendSearch, user_id: JSON.parse(sessionStorage.getItem('user')).user_id })
        .then((result) => {
            console.log(result)
            const updatedFriends = {
                usernames: [...allFriends.usernames, result.data[1].username],
                userIds: [...allFriends.userIds, result.data[1].user_id]
            };
            updateFriends(updatedFriends)
            setFriendSearch("")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleSendMessage = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const recepiant = isOnline.find((user) => user.userId === chatWith[0]);
        console.log("🚀 ~ handleSendMessage ~ recepiant:", recepiant)
        
        if (recepiant) {
            const date = new Date()
            const messageToSend = {
                senderId: user.username,
                receiverId: recepiant.userId,
                message: message,
                date: date
            }

            socket.emit("sendMessage", messageToSend);
            axios.post('http://localhost:3001/api/send_message', {userId1: user.user_id, userId2: chatWith[1], messageToSend})
            .then((res) => {
                console.log("🚀 ~ .then ~ res:", res)
            })
            .catch((err) => {
                console.log(err)
            })
            setAllMessages((prevMessages) => [...prevMessages, messageToSend].sort((a, b) => a.date - b.date))
        }
    };

    return (
            <div className="w-screen h-screen flex">
                <div name="chats" className='flex flex-col w-[25%] min-w-60 border-r-2'>
                    <div className=' min-h-24 h-[15%] bg-lightBeige  flex flex-col'>
                            {JSON.parse(sessionStorage.getItem('user')) ?
                                <div className='mt-[5%] ml-5'>
                                    {JSON.parse(sessionStorage.getItem('user')).username}
                                </div>
                            : null}
                        {
                            friendBar ?
                            <div className='flex w-full mt-2 '>
                                <input value={friendSearch} onInput={e => setFriendSearch(e.target.value)} className="border w-[90%] rounded-l py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Username"></input>
                                <button onClick={handleAddFriend} className='w-[20%] bg-green-500'>Search</button>
                                <button onClick={() => {setFriendBar(!friendBar)}} className='w-[12%] bg-gray-500'>X</button>
                            </div>
                            : 
                            <button onClick={() => {setFriendBar(!friendBar)}} className='text-right mt-2 mr-2 ml-[50%] lg:ml-[70%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                New Chat
                            </button>
                        }
                    </div>
                    {allFriends.usernames == undefined ? null : allFriends.usernames.map((user, idx) => {
                        return (
                        <div onClick={() => {setChatWith([user, allFriends.userIds[idx]])}} className='min-h-10 pl-2 pt-2 h-[10%] border-b-2 border-b-lightBeige'> 
                            {user}
                        </div>)
                    })}
                </div>
                {chatWith == '' ?
                <div>
                    img
                </div> :
                <div name="chat-messages" className="bg-w-gray w-[75%] flex flex-col justify-between">
                    <div className="border-b-2 p-4">
                        {chatWith[0]}
                    </div>
                    <div class="flex-1 overflow-y-auto p-4">
                        <div class="flex flex-col space-y-2">
                            {
                                allMessages.length == 0 ? null :  
                                allMessages.map(x => {
                                    return (
                                    <div class={`px-3 text-black p-2 rounded-lg max-w-xs ${x.senderId != chatWith[0] ? 'self-end bg-blue-200' : 'bg-gray-300'}`}>
                                        {x.message}
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                    <div className="border-t flex">
                        <input onChange={(e) => {setMessage(e.target.value)}} id="user-input" type="text" placeholder="Type a message" className="w-full px-3 py-3 border rounded-lt-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button onClick={handleSendMessage} id="send-button" className="bg-gray-500 text-white px-4 py-2 rounded-rt-md hover:bg-black transition duration-300">Send</button>
                    </div>
                </div>
                }
            </div>
    );
};

export default ChatScreen;