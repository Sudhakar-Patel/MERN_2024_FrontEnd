import React, { useContext, useEffect } from 'react'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import AddBlog from './pages/AddBlog'
import Navbar from './components/Navbar'
import UserDetail from './components/UserDetail'
import context from './context/Context.jsx'


const App = () => {
  const auth=useContext(context)
  const navigate=useNavigate();
  useEffect(() => {
   if(!auth.isAuthenticated){
navigate('/')
   }
  }, [auth.isAuthenticated])
  
  return (
    <>
    <Navbar/>
    
    <Routes>
      <Route path='/' element={<Home/>} />
      {/* <Route path='/user' element={<UserDetail/>} /> */}
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/addblog' element={<AddBlog/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
    </>
  )
}

export default App