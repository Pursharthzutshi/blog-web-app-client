import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../WriteBlog/WriteBlog.css"
import { Navigate } from "react-router-dom";
import "../WriteBlog/WriteBlogResponsive.css"

function WriteBlog({showLogInStatus,loggedInEmailId}){

    const [title,setTitle] = useState("")
    const [topic,setTopic] = useState("")
    const [content,setContent] = useState("")

    const [navToHomePage,setNavToHomePage] = useState("");

    const [showErrorMsg,setShowErrorMsg] = useState("")

    useEffect(()=>{
        console.log(loggedInEmailId)
        console.log(showLogInStatus)

    },[loggedInEmailId, showLogInStatus])

 const sendBlogData = () =>{
    console.log(loggedInEmailId)
    axios.post(`https://blog-web-app-server-53zmzhdnb-pursharthzutshi.vercel.app/writeBlogData`,{loggedInEmailId:loggedInEmailId,title:title,topic:topic,content:content,showLogInStatus:showLogInStatus}).then((res)=>{
        console.log(res);
        if(res.data.ErrorMsg){
            setShowErrorMsg(res.data.ErrorMsg)
            setNavToHomePage(false)
        }else{
            setShowErrorMsg(res.data)
            // setTimeout(()=>{
            // },2000)
            setNavToHomePage(true)
            setNavToHomePage(true)
            // console.lod
        }
    })
    
 }  
    return(
        <div className="write-blog-section">

{
    navToHomePage &&
    <Navigate to="/"/>
}
            <div className="write-blog-bg-image-div">
                <h3>WRITE YOUR BLOG</h3>
            </div>
            <div className="left-sidebar">
    
    </div>
        <div className="write-blog-container">

          <div>
            <input onChange={(e)=>{setTitle(e.target.value)}} placeholder="Title" type="text"/>
            </div>
                 
                 <div>
            <select onChange={(e)=>{setTopic(e.target.value)}}>
                <option value="">Category</option>
                <option value="Web Dev">Web Dev</option>
                <option value="App Dev">App Dev</option>
            </select>
            </div>
        
            <div>
            <textarea onChange={(e)=>{setContent(e.target.value)}} placeholder="Write Your Blog" rol="300" col="300" type="text"></textarea>
            </div>
        
        <div>
        <button onClick={sendBlogData}>Publish</button>
        <p>{showErrorMsg}</p>
        </div>
        <br></br>
        </div>
        </div>
    )
}

export default WriteBlog;