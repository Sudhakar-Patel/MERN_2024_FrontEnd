import React, { useEffect, useState } from 'react'
import UserDetail from '../components/UserDetail';
import axios from 'axios'

const Home = () => {

const [blog, setBlog] = useState([]);

useEffect(() => {
const fetchBlog=async()=>{
    const api=await axios.get(`https://mern-1-usry.onrender.com/api/blogs/allblogs`,
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

  return (
    <>
    
    <div className="container  my-5"style={{width:'50%'}}>
    <h2 className="text-center text-light">ALL BLOGS</h2>


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

export default Home