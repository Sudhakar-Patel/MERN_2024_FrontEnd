import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from '../context/Context.jsx';
import { useNavigate } from 'react-router-dom';


const AddBlog = () => {

const auth=useContext(context)
const navigate=useNavigate();
// console.log(auth)

const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
const [imgURL, setImgURL] = useState("")

useEffect(() => {
  const fetchBlog=async()=>{
      const api=await axios.get(`https://mern-1-usry.onrender.com/api/blogs/blog/${auth.id}`,
      {
        headers:{
          "Content-Type":"application/json"
        } ,       withCredentials:true,
      });
      console.log(api.data.blog);
      // setBlog(api.data.blog);

      setTitle(api.data.blog.title)
      setDescription(api.data.blog.description)
      setImgURL(api.data.blog.imgURL);
  }
    fetchBlog();
  }, [auth.id])

const onSubmitHandler=async(e)=>{
  // alert("your form is submitted...")
  e.preventDefault();
  console.log(title,description,imgURL)

  if(!auth.id){
    try{
      const api=await axios.post(`https://mern-1-usry.onrender.com/api/blogs/new`,{
        title,description,imgURL
      },
      {
        headers:{
          "Content-Type":"application/json"
        } ,       withCredentials:true,
      });
    //  console.log(api);
  
    toast.success(api.data.message)
  
  auth.setIsAuthenticated(true);
  setTimeout(()=>{
    navigate('/profile')
  },1000);
    //  toast.success(api.data.message, {
    //   position: "top-center",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "dark",
    //   transition: Bounce,
    //   });
  }
  catch(error){
  //  console.error(error)
  //  toast.error(error.response.data.message)
  auth.setIsAuthenticated(false);
  
  
  //  toast.error(error.response.data.message, {
  //   position: "top-center",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "dark",
  //   transition: Bounce,
  //   });
    }
  }
  else{
    try{
      const api=await axios.put(`https://mern-1-usry.onrender.com/api/blogs/${auth.id}`,{
        title,description,imgURL
      },
      {
        headers:{
          "Content-Type":"application/json"
        } ,       withCredentials:true,
      });
    //  console.log(api);
  
    toast.success(api.data.message)
  
  auth.setIsAuthenticated(true);
  setTimeout(()=>{
    navigate('/profile')
  },1000);
  auth.setId("");
    //  toast.success(api.data.message, {
    //   position: "top-center",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "dark",
    //   transition: Bounce,
    //   });
  }
  catch(error){
  //  console.error(error)
  //  toast.error(error.response.data.message)
  auth.setIsAuthenticated(false);
  
  
  //  toast.error(error.response.data.message, {
  //   position: "top-center",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "dark",
  //   transition: Bounce,
  //   });
    }
  }
  

  
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
   <div className="container my-5" style={{width: '45%'}}>
    {
        (auth.id)?(<h1 className='text-center'>Update Blog Page</h1>):(<h1 className='text-center'>Add Blog Page</h1>)
    }
   <form onSubmit={onSubmitHandler}>
  <div className="form-group">
    <label htmlFor="name">Title</label>
    <input value={title}
      onChange={(e)=>setTitle(e.target.value)} type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter title"/>
    
  </div>
  
   <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Description</label>
    <textarea value={description}  onChange={(e)=>setDescription(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>

  <div className="form-group">
    <label htmlFor="exampleInputPassword1">imgURL</label>
    <input value={imgURL} onChange={(e)=>setImgURL(e.target.value)} type="text" className="form-control" id="exampleInputPassword1" placeholder="paste imgURL"/>
    
  </div>
  {
    (auth.id)?(<button type="submit" className="btn btn-primary" style={{width:'100%'}}>Update Blog</button>):(<button type="submit" className="btn btn-primary" style={{width:'100%'}}>Add Blog</button>)
    }
</form>
  </div> 
   </>
  )
}

export default AddBlog