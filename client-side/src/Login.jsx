import React from 'react';
import img from './assets/icons/icons8-messages-100.png'

function Login() {
    
    return (
        <div className='flex bg-white md:h-[70%] h-screen md:w-[30%] w-[90vw] gap-7 justify-center items-center flex-col border-1 rounded-md'>
                <div className='flex items-center gap-3 flex-col text-center font-semibold text-4xl'>
                    <img className='size-20' src={img} alt="icon" />
                    <p>Welcome</p>
                </div>
                <div className='flex flex-col w-2/3 gap-3'>
                    <input type="text" className='border-b-2 border-gray-400 pb-2' placeholder='Email' />
                    <input type="text" className='border-b-2 border-gray-400 pb-2' placeholder='Password' />
                <button className='bg-blue-500 text-white p-2 rounded-3xl mt-[3%]'>Login</button>
                </div>
        </div>
    );
}

export default Login;