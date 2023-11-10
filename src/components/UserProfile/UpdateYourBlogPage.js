import axios from "axios";
import React, { useEffect, useState } from "react";

function UpdateYourBlogPage({updateBlogId,setShowUpdateBlogPage}){

    const [updatedBlogTitle,setUpdatedBlogTitle] = useState("")
    const [updatedBlogTopic,setUpdatedBlogTopic] = useState("")
    const [updatedBlogContent,setUpdatedBlogContent] = useState("")

    const [updateMessage,setUpdateMessage] = useState("")

    const [updateMessageStatus,setUpdateMessageStatus] = useState(false)
    axios.defaults.withCredentials = true;

    useEffect(()=>{
        setTimeout(()=>{
            setUpdateMessageStatus(false)
        },2000)
    },[setUpdateMessageStatus])

    const updateBlogTitle = () =>{
        console.log(updateBlogId) 
        axios.put(`https://blog-web-app-server-rho.vercel.app/updateBlogTitle/${updateBlogId}`,{updatedBlogTitle:updatedBlogTitle}).then((res)=>{
     console.log(res.data)
     setUpdateMessage(res.data)
     setUpdateMessageStatus(true)
     })   
    }

    const updateBlogTopic = () =>{
        axios.put(`https://blog-web-app-server-rho.vercel.app/updateBlogTopic/${updateBlogId}`,{updatedBlogTopic:updatedBlogTopic}).then((res)=>{
           console.log(res) 
           setUpdateMessage(res.data)
           setUpdateMessageStatus(true)
        })   
       }
       const updateBlogContent = () =>{
        axios.put(`https://blog-web-app-server-rho.vercel.app/updateBlogContent/${updateBlogId}`,{updatedBlogContent:updatedBlogContent}).then((res)=>{
           console.log(res)
           setUpdateMessage(res.data)
           setUpdateMessageStatus(true)
        })   
       }

useEffect(()=>{
    console.log(updateBlogId)
},[updateBlogId])

const closePage = ()=>{
    setShowUpdateBlogPage(false)
    window.location.reload()
}

    return(
        <div>
            <div className="write-blog-section">
                <div className="close-blog-page-button-div">
<button className="close-blog-page-button" onClick={closePage}>×</button>
</div>
            <h3>Update Your Blog</h3>
<h3 className="update-message">
    {updateMessageStatus ?
    updateMessage:null
    }
    </h3>

            <div className="">
    
    </div>
        <div className="write-blog-container">
          <div>
            <input onChange={(e)=>{setUpdatedBlogTitle(e.target.value)}} placeholder="Title" type="text"/>
            <button onClick={updateBlogTitle}>Update Title</button>
            </div>
                 
                 <div>
            <select onChange={(e)=>{setUpdatedBlogTopic(e.target.value)}}>
                <option value="">Category</option>
                <option value="Web Dev">Web Dev</option>
                <option value="App Dev">App Dev</option>
            </select>
            <button onClick={updateBlogTopic}>Update Topic</button>

            </div>
        
            <div>
            <textarea onChange={(e)=>{setUpdatedBlogContent(e.target.value)}} placeholder="Write Your Blog" rol="300" col="300" type="text"></textarea>
            <button onClick={updateBlogContent}>Update content</button>

            </div>
        
        <div>
        <p></p>
        </div>
        <br></br>
        </div>
        </div>
        </div>
    )
}

export default UpdateYourBlogPage;