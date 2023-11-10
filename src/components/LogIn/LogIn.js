import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "../register.css"
import "./LogIn.css"
import "./LogInResponsive.css"

function LogIn({showLogInStatus,setLogOutButton,setShowWelcomeBackMsg,loggedInEmailId,setLoggedInEmailId}){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [showLoginErrorStatus,setShowLoginErrorStatus] = useState("")

    const [redirectHomePage,setRedirectHomePage] = useState(false)

    const [logInStatus,setLogInStatus] = useState("");

    axios.defaults.withCredentials = true;

    const logInUsers = ()=>{
        axios.post(`https://blog-web-app-server-rho.vercel.app/logInUsers`,
        {
            email:email,
            password:password
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
          withCredentials: true,
        } 
        ).then((response)=>{                    
        if(response.data.message){
            setLogOutButton(false)
            localStorage.setItem("setLogOutButton","false")
            setShowLoginErrorStatus(response.data.message)
            setRedirectHomePage(false) 
            setShowWelcomeBackMsg(false)
            // setLoggedInEmailId("")
        }else{
            setLogOutButton(true)
            localStorage.setItem("setLogOutButton","true")
            setRedirectHomePage(true)
            setShowWelcomeBackMsg(true)
            // setLoggedInEmailId(response.data[0].EmailId)
            console.log(response.data[0].Emailid)
            
        }
        }) 
    }
          

    return(
        <div className="login-section">
            <br></br>
       <h3>LogIn</h3>
            {
                redirectHomePage && 
                <Navigate to="/"/>
            }
            <br></br>
            <div className="form-container">
            
            <form className="register-form">
            
            <input onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Email Id"/>
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password"/>
            
            </form>
            </div>
            <p>{logInStatus}</p>
            <p>{showLoginErrorStatus}</p>
            <div className="register-button-div">
            <button onClick={logInUsers}>LogIn</button>
        </div>
        </div>
    )
}

export default LogIn;