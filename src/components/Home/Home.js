import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import "./Home.css"
import "../BlogPage.css"
import BlogImage from "../Home/images/pexels-pixabay-270360.jpg"
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom"
import BlogPage from "./BlogPage/BlogPage";
import "./HomeResponsive.css"

function Home({blogNo,setsBlogNo,showWelcomeBackMsg,showLogInStatus,showBlogData,setShowBlogData,showBlogContent}){

    const [searchBlog,setSearchBlog] = useState("")
    const [showAllBlogContent,setShowAllBlogContent] = useState(true);

    const [showFilterBox,setShowFilterBox] = useState(false);

    const showFilterDialogBox = () =>{
        setShowFilterBox(true);
    }

    const closeFilterBox= () =>{
        setShowFilterBox(false);
    }

    const testTwo = (category)=>(value) => {
            
            //  if(value.target.checked){
            //     const filteredItem = data.filter((val)=>{
            //         return val.topic  === category;  
            //     })
            //     setData(filteredItem)  
            //    }else if(!value.target.checked){
                
            //  }
    }


   useEffect(()=>{
    axios.get(`https://blog-web-app-server-53zmzhdnb-pursharthzutshi.vercel.app/fetch`).then((res)=>{
        setShowBlogData(res.data.data)
        console.log(res.data.data)
    })
   },[setShowBlogData])


    return(

        <div className="home-page">

<div className="top-bar-blog-post-container">
    <br></br>
<div className="welcome-back-msg">
{
showWelcomeBackMsg &&
  <p>Welcome Back {showLogInStatus}</p>
}
</div>
            <div className="top-bar-heading-div">
            <header>
                <div className="header-heading-div">
                <h2>Welcome To Our Blog Page</h2>
                </div>
          
            </header>

            </div>
            
            <div className="search-blog-input-div">
            <input onChange={(e)=>{setSearchBlog(e.target.value)}}  placeholder="Search Any Blog" type="text"/>
            </div>
<div className="blog-right-container">

        <div className="home-page-boxes-blog-container">
            <div className="blog-box-container">
            {
            showBlogData.filter((val)=>{
                if(searchBlog === ""){
                    return val
                }else if(val.title.toLowerCase().includes(searchBlog.toLowerCase())){
                    return val
                }
            }).map((val,key)=>{
                return <div>
                    <div className="blog-boxes">
                        <img src={BlogImage}/>
                    <h3>{val.title}</h3>
                    <p>{val.topic}</p>
                    <p className="author-name">By {val.author}</p>
                    <p>{val.content.substr(0,200)}...</p>

<div className="blog-button-container">
<p></p>
{/* <button onClick={showDate}>Show Date</button> */}
<Link to="/blog">
<button  onClick={()=>{showBlogContent(val._id)}}>View Blog</button>
</Link>


</div>
                    </div>
                    
                </div>
                 })}
                 
      
        </div>

        </div>

        {
                showFilterBox
                && <div className="filter-dialog-box">
                                
            <h3>Categories</h3>

<div className="categories-checkbox-container">
<input  onClick={(e)=>{testTwo("Web Dev")(e)}} type="checkbox" />
<label>Web Dev</label>
    
<input onClick={(e)=>{testTwo("App Dev")(e)}} type="checkbox" />
<label>App Dev</label>

<input onClick={()=>{testTwo('Game Dev')}} type="checkbox"/>
<label>Game Dev</label>

<button className="filter-apply-button" onClick={closeFilterBox}>Apply</button>
</div>

                </div>
        }
        <div>
<button onClick={showFilterDialogBox} className="filter-button">Filter Button</button>
</div>

        <div className="right-side">

            <h3>Categories</h3>

    <div className="categories-checkbox-container">
    <input onClick={(e)=>{testTwo("Web Dev")(e)}} type="checkbox" />
    <label>Web Dev</label>
        
    <input onClick={(e)=>{testTwo("App Dev")(e)}} type="checkbox" />
    <label>App Dev</label>

    <input onClick={()=>{testTwo('Game Dev')}} type="checkbox"/>
    <label>Game Dev</label>
    </div>

</div>
</div>
        </div>

   
        </div>
    )
}

export default Home;