import React from "react";
import "./AboutUs.css"
import ServicesData from  "./ServicesData"
import images from "../AboutUs/images/customer-service.png"
import AboutUsData from "./AboutUsData";
import  "./AboutUsResponsive.css";

function AboutUs(){
    return(
        
        <div className="about-us-section">
            <br></br>
            <h3 className="headings">Our Service </h3>
            <div className="service-div-container">
{
ServicesData.map((val)=>{
    return <div>


<div className="services-div">
<img src={images} alt=""/>
<p>{val.content}</p>
</div>



    </div>
})
}
</div>

<h3 className="headings">About Us </h3>
<div className="about-section">

<div className="left-div">
{
AboutUsData.map((val)=>{
    
    return <div className="name-div-container">
        <div className="name-div">
        <h3 className="about-us-name">Name : {val.name}</h3>
        </div>
    </div>
})
}</div>

<div className="right-div"> 
{
AboutUsData.map((val)=>{
    
    return <div>       
        <p>{val.desc}</p>
    </div>
})
}
</div>


    </div>
    <br></br>


        </div>
    )

}

export default AboutUs;