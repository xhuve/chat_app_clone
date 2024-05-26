import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ChatScreen = () => {

    const nav = useNavigate()

    useEffect(() => {
        axios.post("http://localhost:3001/verify", { token: localStorage.getItem("s_token")})
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
            console.log(err)
            nav("/")
        })
    }, [])

    const users = ["Person 1", "Person 2", "Person 3", "Person 4"]

    const [chatWith, setChatWith] = useState('')
    const [friendSearch, setFriendSearch] = useState(false)

    return (
            <div className="w-screen h-screen flex">
                <div name="chats" className='flex flex-col w-[25%] min-w-60 border-r-2'>
                    <div className=' min-h-16 h-[15%] bg-lightBeige  flex flex-col'>
                        <div className='mt-[5%] ml-5'>
                            Username
                        </div>
                        {
                            friendSearch ?
                            <div className='flex w-full mt-2'>
                                <input class="border w-[90%] rounded-l py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Username"></input>
                                <button onClick={() => {setFriendSearch(!friendSearch)}} className='w-[10%] bg-gray-500'>X</button>
                            </div>
                            : 
                            <div onClick={() => {setFriendSearch(!friendSearch)}} className='text-right mt-3 mr-2'>
                                New Chat
                            </div>
                        }
                    </div>
                    {users.map((user) => {
                        return (
                        <div onClick={() => {setChatWith(user)}} className='min-h-10 pl-2 pt-2 h-[10%] border-b-2 border-b-lightBeige'> 
                            {user}
                        </div>)
                    } 
                    )}
                </div>
                {chatWith == '' ?
                <div>
                    img
                </div> :
                <div name="chat-messages" className="bg-w-gray w-[75%] flex flex-col justify-between">
                    <div class="border-b-2 p-4">
                        {chatWith}
                    </div>
                    <div class="border-t flex">
                        <input id="user-input" type="text" placeholder="Type a message" className="w-full px-3 py-3 border rounded-lt-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button id="send-button" className="bg-gray-500 text-white px-4 py-2 rounded-rt-md hover:bg-black transition duration-300">Send</button>
                    </div>
                </div>
                }
            </div>
    );
};

export default ChatScreen;