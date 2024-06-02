import React, { useContext, useEffect } from 'react';

function FriendList({ setChatProp }) {

    const [friendBar, setFriendBar] = useState(false)
    const [friendSearch, setFriendSearch] = useState("")
    const allFriends = useContext(FriendContext)


    const handleAddFriend = () => {
        axios.post("http://localhost:3001/api/add_friends", { friendName: friendSearch, user_id: JSON.parse(sessionStorage.getItem('user')).user_id })
        .then((result) => {
            console.log(result.data)
            updateFriends([...allFriends, result.data[1].username])
            setFriendSearch("")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div name="chats" className='flex flex-col w-[25%] min-w-60 border-r-2'>
        <div className=' min-h-16 h-[15%] bg-lightBeige  flex flex-col'>
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
        {allFriends.map((user) => {
            return (
            <div onClick={() => {setChatProp(user)}} className='min-h-10 pl-2 pt-2 h-[10%] border-b-2 border-b-lightBeige'> 
                {user}
            </div>)
        }
        )}
        </div>
    );
}

export default FriendList;