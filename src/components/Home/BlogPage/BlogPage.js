import axios from "axios";
import React, { useEffect,useState } from "react";
import "./individualBlogPage.css"
import image from "./images/pexels-pixabay-270360.jpg"

function BlogPage({blogNo}){

    const [showIndividualBlogData,setShowIndividualBlogData] = useState([])

    const [blogNoId,setBlogNoId] = useState("")

    // useEffect(()=>{
    //     const savedIndividualBlogPostId = localStorage.getItem("SaveBlogNo")
        
    //     setBlogNoId(savedIndividualBlogPostId)
    //     console.log(blogNoId)

    // },[blogNoId])
    axios.defaults.withCredentials = true;

    useEffect(()=>{
        console.log(blogNo)
        axios.get(`https://blog-web-app-server-rho.vercel.app/fetch/${blogNo}`).then((res)=>{
            console.log(res.data);
            setShowIndividualBlogData(res.data)
        })

        
    },[blogNo])

    return(
        <div>
{
    showIndividualBlogData.map((val)=>{
        return <div className="blog-page-container">
           <h2> {val.title}</h2>
           <span>By {val.author}</span>
           <br></br>
           <img src= {image}/>
           <p> {val.content}</p>
        </div>
    })
}
<br></br>
        </div>
    )
}

export default BlogPage;