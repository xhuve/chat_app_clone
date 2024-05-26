import React, { useState } from 'react';
import img from '../assets/icons/icons8-messages-100.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [loginInfo, setLoginInfo] = useState({})
    const nav = useNavigate()
    
    const handleInput = (event) => {
        setLoginInfo({...loginInfo, [event.target.name]: event.target.value})
        console.log(loginInfo)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login", loginInfo, { withCredentials: true })
        .then((res) => {
            localStorage.setItem("s_token", res.data)
            nav("/chat")
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='w-screen h-screen overflow-hidden flex items-center justify-between bg-gray-200'>
            <div className='w-2/3 md:w-1/3 h-screen bg-gradient-to-r from-blue-500 to-white md:to-transparent'>
            </div>
            <div className='flex bg-white lg:h-[70%] lg:w-[30%] md:h-[70%] md:w-[50%] h-screen w-[90vw] md:mr-[10%] md:border-2 border-gray-300 border-solid gap-7 justify-center items-center flex-col border-1 rounded-md'>
                    <div className='flex items-center gap-3 flex-col text-center font-semibold text-4xl'>
                        <img className='size-20' src={img} alt="icon" />
                        <p>Welcome</p>
                    </div>
                    <form onSubmit={handleLogin} className='flex flex-col w-2/3 gap-3'>
                        <input onChange={handleInput} type="text" className='border-b-2 border-gray-400 pb-2' name='username' placeholder='Username' />
                        <input onChange={handleInput} type="password" className='border-b-2 border-gray-400 pb-2' name='password' placeholder='Password' />
                        <button type='submit' className='bg-blue-500 text-white p-2 rounded-3xl mt-[3%]'>Login</button>
                        <div className='text-right'>No account? <a onClick={() => {nav("/register")}} className='text-blue-700 underline'>Click here</a></div>
                    </form>
            </div>
        </div>
    );
}

export default Login;