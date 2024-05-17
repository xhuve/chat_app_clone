import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Welcome from './components/Welcome.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'



/*
  In the future, add a function that makes the user go back to the login page 
  based on whether the user token/cookie is invalid. Going to have to think more about that.
  R-R-D docs say i should have a root route. Maybe the logic for above couuld be stored in that.
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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
