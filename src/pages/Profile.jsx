import React, { useContext, useEffect, useState } from 'react'
import context from '../context/Context';
import axios from 'axios';
import MyBlogs from '../components/MyBlogs';
import { FaBeer } from 'react-icons/fa';
import { FaUserCircle } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Profile = () => {
  const auth=useContext(context)
  const [user, setUser] = useState([]);

  useEffect(() => {
  const fetchUser=async()=>{
      const api=await axios.get(`https://mern-1-usry.onrender.com/api/users/myprofile`,
      {
        headers:{
          "Content-Type":"application/json"
        } ,       withCredentials:true,
      });
      console.log(api.data.user);
      // setBlog(api.data.blogs)
      auth.setUser(api.data.user)
      auth.setIsAuthenticated(true);
  }
    fetchUser();
  }, [])
  

  return (
    <div className="text-center">
         <h2><FaUserCircle/>{" "}{user.name}</h2>
          <h2><IoMdMail />{" "}{user.email}</h2>
      <MyBlogs/>
    </div>
  )
}

export default Profile