import React, { useContext, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from '../context/Context.jsx';
import { useNavigate } from 'react-router-dom';


const Login = () => {
const auth=useContext(context)
const navigate=useNavigate();
// console.log(auth)

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")


const onSubmitHandler=async(e)=>{
  // alert("your form is submitted...")
  e.preventDefault();
  console.log(email,password)

  try{
    const api=await axios.post(`https://mern-1-usry.onrender.com/api/users/login`,{
      email,password
    },
    {
      headers:{
        "Content-Type":"application/json"
      } ,       withCredentials:true,
    });
  //  console.log(api);

  // toast.success(api.data.message)

  auth.setIsAuthenticated(true);
  navigate('/profile')

  // setTimeout(()=>{
  //   navigate('/profile')
  // },1000);
  
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
 toast.error(error.response.data.message)
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
    <h1 className='text-center'>Login User</h1>
   <form onSubmit={onSubmitHandler}>


  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input value={email}  onChange={(e)=>setEmail(e.target.value)}type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    
  </div>

  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
    
  </div>
  
  <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Login</button>
</form>
  </div> 
   </>
  )
}

export default Login