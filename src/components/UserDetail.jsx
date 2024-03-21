import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaBeer } from 'react-icons/fa';
import { FaUserCircle } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";


const UserDetail = ({id}) => {
const [user, setUser] = useState({})
  useEffect(() => {
    const fetchUser=async()=>{
        const api=await axios.get(`https://mern-1-usry.onrender.com/api/users/${id}`,
        {
          headers:{
            "Content-Type":"application/json"
          } ,       withCredentials:true,
        });
        console.log(api.data.user);
        setUser(api.data.user)
    }
      fetchUser();
    }, [])

  return (
    <>
    <h4><FaUserCircle/>{" "}{user.name}</h4>
    <h4><IoMdMail />{" "}{user.email}</h4>
    </>

  )
}

export default UserDetail