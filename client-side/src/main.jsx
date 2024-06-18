import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Welcome from './components/Welcome.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import ChatScreen from './components/ChatScreen.jsx'



/*
  Add message field in friends table and message fetcher functionality
*/


const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: '/chat',
    element: <ChatScreen />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
