import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

    const nav = useNavigate();

    const handleButtonClick = (event) => {
        nav("/" + event.target.name)
    }

    return (
        <div className='h-screen'>
            <div className='h-3/4 text-center flex-row gap-2 content-center bg-gradient-to-b from-blue-400 from-70% '>
                <div className='stroke-black text-white text-8xl font-freeman' style={{WebkitTextStrokeWidth: '2px', WebkitTextStrokeColor: "black"}}>
                    Welcome
                </div>
                <div className='text-white text-xl font-reddit-sans font-light'>
                    This is a simple chat app
                </div>
            </div>
            <div className='flex justify-around mt-[1%] mx-[10%]'>
                <button onClick={handleButtonClick} name="login" type="button" class="text-white font-reddit-sans text-3xl bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-gray-300
                font-medium rounded-full px-7 py-2.5 me-2 mb-4">Login</button>

                <button onClick={handleButtonClick} name='register' type="button" class="text-white font-reddit-sans text-3xl bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-gray-300
                font-medium rounded-full px-7 py-2.5 me-2 mb-4">Register</button>
            </div>
        </div>
    );
};

export default Welcome;