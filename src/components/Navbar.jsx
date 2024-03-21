import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import context from '../context/Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { RiLoginBoxFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";

const Navbar = () => {
    const auth = useContext(context);
    const navigate = useNavigate();

    const logOut = async () => {
        const api = await axios.get(`https://mern-1-usry.onrender.com/api/users/logout`,
            {
                headers: {
                    "Content-Type": "application/json"
                }, withCredentials: true,
            });
        //  console.log(api);

        toast.success(api.data.message)

        auth.setIsAuthenticated(false);
        setTimeout(() => {
            navigate('/')
        }, 1000);
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
        //   } 
    }

    return (
        <>
            <div className="navbar">
                <Link to="/" className="items">
                    <h2>MERN - Blog</h2>
                </Link>
                <div className="right">
                {(!auth.isAuthenticated) && 
                        <Link to="/login" className='items'><h3><RiLoginBoxFill /></h3></Link>
                    }
                     {(!auth.isAuthenticated) &&
                        <Link to="/register" className='items'><h3>Register</h3></Link>
                    }
                     {(auth.isAuthenticated) &&
                        <Link to="/addblog" className='items'><h3>AddBlog</h3></Link>
                     }
                     {(auth.isAuthenticated) &&
                        <Link to="/profile" className='items'><h3><FaUserCircle /></h3></Link>
                }
                  {(auth.isAuthenticated) &&
                        <div onClick={logOut} className="items"><h3><RiLogoutBoxFill /></h3></div>
                  }
                </div>
            </div>

        </>
    )
}
export default Navbar