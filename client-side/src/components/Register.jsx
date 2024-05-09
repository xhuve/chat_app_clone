import React, { useState } from 'react';
import img from '../assets/icons/icons8-messages-100.png'
import axios from 'axios';

function Register() {

    const [registerInfo, setRegisterInfo] = useState({})

    const handleRegister = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/register", registerInfo)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleInput = (e) => {
        setRegisterInfo({...registerInfo, [e.target.name]: e.target.value})
    }
    
    return (
        <div className='flex bg-white lg:h-[70%] lg:w-[30%] md:h-[70%] md:w-[50%] h-screen w-[90vw] gap-7 justify-center items-center flex-col border-1 rounded-md'>
                <div className='flex items-center gap-3 flex-col text-center font-semibold text-4xl'>
                    <img className='size-20' src={img} alt="icon" />
                    <p>Welcome</p>
                </div>
                <form onSubmit={handleRegister} className='flex flex-col w-2/3 gap-3'>
                    <input onChange={handleInput} name="username" type="text" className='border-b-2 border-gray-400 pb-2' placeholder='Username' />
                    <input onChange={handleInput} name="password" type="text" className='border-b-2 border-gray-400 pb-2' placeholder='Password' />
                    <button type="submit" className='bg-blue-500 text-white p-2 rounded-3xl mt-[3%]'>Register</button>
                </form>
        </div>
    );
}

export default Register;