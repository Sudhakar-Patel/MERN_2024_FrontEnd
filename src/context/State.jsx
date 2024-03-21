import React, { useState } from 'react'
import context from './Context'

const State = (props) => {
  
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const[user,setUser]=useState("");
    const[id,setId]=useState("")
    return (
  <context.Provider value={{
    isAuthenticated, setIsAuthenticated,
    user,setUser,
    id,setId
  }}>
    {props.children}
    </context.Provider>
  )
}
export default State