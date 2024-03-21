import React, { useContext, useEffect, useState } from 'react'
import UserDetail from '../components/UserDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import context from '../context/Context';
import State from '../context/State';

const MyBlogs = () => {
    const navigate= useNavigate();

const [blog, setBlog] = useState([]);
const auth=useContext(context);

useEffect(() => {
const fetchBlog=async()=>{
    const api=await axios.get(`https://mern-1-usry.onrender.com/api/blogs/myblogs`,
    {
      headers:{
        "Content-Type":"application/json"
      } ,       withCredentials:true,
    });
    console.log(api.data.blogs);
    setBlog(api.data.blogs)
}
  fetchBlog();
}, [])

const deleteBlog=async(id)=>{
    const api=await axios.delete(`https://mern-1-usry.onrender.com/api/blogs/${id}`,
    {
      headers:{
        "Content-Type":"application/json"
      } ,       withCredentials:true,
    });
    // console.log(api.data.message);
    setBlog(api.data.blogs)
  toast.success(api.data.message)
}

const updateBlog=async(id)=>{
    auth.setId(id);
    navigate('/addblog')
}
  return (
    <>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    <div className="container  my-5"style={{width:'50%'}}>
    <h2 className="text-center text-light">MY BLOGS</h2>


    {blog.map((data)=>{
      return (
        <>
        
        <div className="card my-4 mb-3 bg-secondary text-light" style={{maxWidth: '660px'}}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src={data.imgURL} className="card-img" style={{height:'100%'}}alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h2 className="card-title">{data.title}</h2>
        <p className="card-text">{data.description}</p>
        <p className="card-text"><small >{data.creditedAt}</small></p>
        <UserDetail id={data.user}/>
         <button onClick={()=>updateBlog(data._id)} className='btn btn-warning mx-5'>Update</button>
        <button onClick={()=>deleteBlog(data._id)} className='btn btn-danger mx-5'>Delete</button>
      </div>
    </div>
  </div>
</div>
        </>
      )
    })}
    
    </div>
    
    </>
  )
}

export default MyBlogs