import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ChatScreen = () => {

    const [chatWith, setChatWith] = useState('')
    const [friendBar, setFriendBar] = useState(false)
    const [friendSearch, setFriendSearch] = useState("")
    const [allFriends, updateFriends] = useState([])
    const nav = useNavigate()

    // 
    useEffect(() => {
        axios.post("http://localhost:3001/verify", { token: localStorage.getItem("s_token")})
        .then((verifyRes) => {
            sessionStorage.setItem("user", JSON.stringify(verifyRes.data))
            axios.post("http://localhost:3001/api/load_friends", { userId: verifyRes.data.user_id})
            .then((friendResult) => {
                updateFriends(friendResult.data.map(x => x.username))
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

    const handleAddFriend = () => {
        axios.post("http://localhost:3001/api/add_friends", { friendName: friendSearch, user_id: JSON.parse(sessionStorage.getItem('user')).user_id })
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
            <div className="w-screen h-screen flex">
                <div name="chats" className='flex flex-col w-[25%] min-w-60 border-r-2'>
                    <div className=' min-h-16 h-[15%] bg-lightBeige  flex flex-col'>
                        <div className='mt-[5%] ml-5'>
                            {JSON.parse(sessionStorage.getItem('user')).username}
                        </div>
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
                    {allFriends.map((user) => {
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
                    <div className="border-b-2 p-4">
                        {chatWith}
                    </div>
                    <div className="border-t flex">
                        <input id="user-input" type="text" placeholder="Type a message" className="w-full px-3 py-3 border rounded-lt-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button id="send-button" className="bg-gray-500 text-white px-4 py-2 rounded-rt-md hover:bg-black transition duration-300">Send</button>
                    </div>
                </div>
                }
            </div>
    );
};

export default ChatScreen;