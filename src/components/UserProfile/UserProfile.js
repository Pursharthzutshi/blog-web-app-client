import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserProfile.css"
import UpdateYourBlogPage from "./UpdateYourBlogPage";

function UserProfile({loggedInEmailId,showBlogContent}){

    const [userProfileInfo,setUserProfileInfo] = useState("")

    const [updateBlogId,setUpdateBlogId] = useState("");

    const [showUpdateBlogPage,setShowUpdateBlogPage] = useState(false)

    const [userBlogsInfo,setUserBlogsInfo] = useState([])

    const [deleteUserDialogBoxBackgroundDiv,setDeleteUserDialogBoxBackgroundDiv] = useState(false)

    const [deleteUserDialogBox,setDeleteUserDialogBox] = useState(false)

    const showDeleteUserDialogBlog = () =>{
        setDeleteUserDialogBoxBackgroundDiv(true)
        setDeleteUserDialogBox(true)
    }

    const hideUserDeleteDialogBox = ()=>{
        setDeleteUserDialogBoxBackgroundDiv(false)
        setDeleteUserDialogBox(false)    
    }

    useEffect(()=>{
        axios.post("/fetchUserProfileInfo",{loggedInEmailId:loggedInEmailId}).then((res)=>{
            console.log(res)
        })
    },[loggedInEmailId])

    const DeleteUserBlog = (id) =>{
        axios.delete(`http://localhost:3001/deleteUserBlog/${id}`).then((res)=>{
            console.log(res)
        })
        setDeleteUserDialogBoxBackgroundDiv(false)
        setDeleteUserDialogBox(false)    
        window.location.reload()        
    }

    const updateBlogContent = (id)=>{
        userBlogsInfo.map((val)=>{
            console.log(val._id === id)

            if(val._id === id){
                return setShowUpdateBlogPage(true)
            }
            // else{
            //     return setShowUpdateBlogPage(false)
            // }
       
        })
  
        
        setUpdateBlogId(id)
    }

    useEffect(()=>{
        console.log(loggedInEmailId)
        axios.post(`http://localhost:3001/fetchUserBlogsInfo`,{loggedInEmailId:loggedInEmailId}).then((res)=>{
            console.log(res);
            setUserBlogsInfo(res.data)
        })
    },[loggedInEmailId])

    return(
        <div className="user-profile-page-section">
            <div>
            <h3>My Profile</h3>
            </div>
          
            {
                userBlogsInfo.map((val,key)=>{


                   return <div>
                    <div className="blog-boxes">
                    <h3>{val.title}</h3>
                    <p>{val.topic}</p>
                    <p className="author-name">By {val.author}</p>
                    <p>{val.content.substr(0,200)}...</p>
                    <Link to="/blog">
<button onClick={()=>{showBlogContent(val._id)}}>View Blog</button>
<br></br>
<br></br>

</Link>

<button to="/updateYourBlogPage" onClick={()=>{updateBlogContent(val._id)}}>Update Your Blog</button>

{
    showUpdateBlogPage
    &&
    <section className="update-blog-page-section">
    <UpdateYourBlogPage setShowUpdateBlogPage={setShowUpdateBlogPage} updateBlogId={updateBlogId}/>
    </section>
}

<br></br>
{
    deleteUserDialogBoxBackgroundDiv &&
    <div className="delete-user-dialog-box-background-div">
{
    
deleteUserDialogBox && 
<div className="delete-dialog-box">
    <h3>Are you sure you want to delete this blog</h3>
    <div className="delete-dialog-box-buttons-container">
        <button  onClick={()=>{DeleteUserBlog(val._id)}}>Yes</button>
        <button className="no-button" onClick={hideUserDeleteDialogBox}>No</button>
</div>
</div>
}

</div>

}

<button className="delete-your-blog-button" onClick={showDeleteUserDialogBlog}>Delete Your Blog</button>

<div className="blog-button-container">
<p></p>


</div>
                    </div>
                    
                </div>
                })
                  
            }
            
        </div>
    )
}

export default UserProfile