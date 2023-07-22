import axios from "axios";
import React from "react";
import { useState } from "react";
import "./SignUp.css"
import "./SignUpResponsive.css"
import SignUpIcon from "./images/sign-up-icon.png"
import { Navigate } from "react-router-dom";

function SignUp({signUpErrorMsg,setSignUpErrorMsg}){

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [reCheckPassword,setReCheckPassword] = useState("")

    const [showSignUpStatus,setShowSignUpStatus] = useState("");

    const [redirectHomePage,setRedirectHomePage] = useState(false)

    const sendSignUpDetails = () =>{
        axios.post("http://localhost:3001/SignUpDataInsert",{name:name,email:email,password:password,reCheckPassword:reCheckPassword}).then((response)=>{
        console.log(name)  
        if(response.data.message){
                console.log(response)
                setShowSignUpStatus(response.data.message)
                setSignUpErrorMsg(true)
                setRedirectHomePage(false)
            }else if(response){
                setSignUpErrorMsg(false)
                console.log(response)
                console.log("Successful")
                setRedirectHomePage(true)
            }
        })
    }

    const preventFormSubmit = (e)=>{
        e.preventDefault();
    }

    return(

        <div className="sign-up-section">
           {
            redirectHomePage && <Navigate to ="/"/>
           }
        
        <div className="register-form-container">
      
            <div className="container">
            <h2>Sign Up</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dolor nulla, dignissim sit amet est non, finibus rhoncus leo.</p>
            <img className="sign-up-icon" src={SignUpIcon}/>
            </div>
            <div className="form-container">
            <h3>Sign Up </h3>
            <form onClick={(e)=>{preventFormSubmit(e)}} className="register-form">
            <input onChange={(e)=>{setName(e.target.value)}}  placeholder="Name" type="text"/>
            <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" type="email"/>
            <input onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" type="password"/>
            <input onChange={(e)=>{setReCheckPassword(e.target.value)}} placeholder="Re-Check Password" type="password"/>
            
            <div className="register-button-div">
            <button onClick={sendSignUpDetails}>Sign Up</button>
            </div>
            <p >
                
                {signUpErrorMsg ? <p className="sign-up-error-message">{showSignUpStatus}</p>
                :<p className="signed-up-msg">Signed Up</p>}
                
                </p>
   
            </form>
        </div>
        </div>
        </div>
    )
}

export default SignUp;