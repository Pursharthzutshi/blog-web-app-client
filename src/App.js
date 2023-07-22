import './App.css';
import { BrowserRouter as Router,Routes,Link, Route, Navigate} from 'react-router-dom';
import Home from './components/Home/Home';
import WriteBlog from './components/WriteBlog/WriteBlog';
import "../src/components/BlogPage.css"
import LogoImage from "../src/images/blogging.png"
import AboutUs from './components/AboutUs/AboutUs';
import BlogPage from './components/Home/BlogPage/BlogPage';
import { useEffect, useState } from 'react';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import axios from 'axios';
import "./AppResponsive.css"
import UserProfile from "../src/components/UserProfile/UserProfile"
import UpdateYourBlogPage from './components/UserProfile/UpdateYourBlogPage';

function App() {

  const [redirectToMainPage,setRedirectToMainPage] = useState(false);
  
  const [blogNo,setBlogNo] = useState("")

  const [showBlogData,setShowBlogData] = useState([])

  const [showLogInStatus,setShowLogInStatus] = useState("")
  // const [showLogOut,setShowLogOut] = useState(true)

  const [loggedInEmailId,setLoggedInEmailId] = useState("");

  const [navToHomePage,setNavToHomePage] = useState(false);

  const [showWelcomeBackMsg,setShowWelcomeBackMsg] = useState(false);

  const [showNavigationMenu,setShowNavigationMenu] = useState(false);

  const [logOutButton,setLogOutButton] = useState(false);

  const [signUpErrorMsg,setSignUpErrorMsg] = useState(true)


  // useEffect(()=>{
  //   if(loggedInEmailId){
  //   }
  // },[loggedInEmailId])

  useEffect(()=>{
    const userLoginState = JSON.parse(localStorage.getItem("setLogOutButton"))
    setLogOutButton(userLoginState)

  },[logOutButton])


  const logOut = ()=>{
    axios.get(`http://localhost:3001/logout`).then((response)=>{
      // setRedirectToMainPage(true)

      console.log(response);
      setNavToHomePage(true)
      setLogOutButton(false)
      setLoggedInEmailId("")
      localStorage.setItem("setLogOutButton","false")
    })
  }

  const showNavBar = ()=>{
    setShowNavigationMenu(true)
  }

  const hideNavBar = ()=>{
    setShowNavigationMenu(false)
  }
  
  axios.defaults.withCredentials = true
    
  useEffect(()=>{
        // localStorage.setItem("showLogOut",true)
    axios.get(`http://localhost:3001/logInUsers`).then((res)=>{
      console.log(res)
        if(res.data.loggedIn === true){
            setShowLogInStatus(res.data.user[0].name)
            setShowWelcomeBackMsg(true)
            setLoggedInEmailId(res.data.user[0].Emailid)
            console.log(res.data.user[0].Emailid)
        }else{
          setShowLogInStatus("")
          // setLoggedInEmailId("")
        }   

    })
})

const showBlogContent = (individualBlogPostId) =>{
  console.log(individualBlogPostId)
  axios.get(`http://localhost:3001/fetch/${individualBlogPostId}`).then((res)=>{
   
        setShowBlogData(res.data)
        setBlogNo(individualBlogPostId)
        localStorage.setItem("SaveBlogNo",individualBlogPostId)    
      console.log(res.data)
  })

}


useEffect(()=>{
  setBlogNo(localStorage.getItem("SaveBlogNo"))    
},[])

const [test,setTest] = useState("")

useEffect(()=>{
  setTimeout(()=>{
    setSignUpErrorMsg(true)
  },2000)
})


  const updateBlogContent = (id) =>{
    console.log(id)
    setTest(id)
}


  return (
    <div className="App">

      {
        redirectToMainPage && <Navigate to ="/aboutUs"/>
      }

      <div className="logo-div">

        <h3>MyBlogs</h3>
        <img className="logo-image" src={LogoImage}/>
        </div>

<div className='nav-button-div'>

<button onClick={showNavBar} className='nav-button'>Nav Bar</button>

</div>

<Router>
{/* 
<Link to ="/about">About</Link> */}


<Routes>

<Route path="/about" component={<AboutUs/>}></Route>

</Routes>

</Router>

<Router className="nav-bar-links-container">
  <div>
<Link className="nav-bar-links" to="/">Home</Link>
  <Link className="nav-bar-links" to="/aboutUs">About Us</Link>


  <Link className="nav-bar-links" to="/signUp">Sign Up</Link>
  </div>
  <br></br>
  <div className='log-out-div'>
  {
  logOutButton ?
  <div>
<Link className="nav-bar-links" to="/writeBlog">Write Blog</Link>

<Link className='nav-bar-links' to="/myProfile"> My Profile</Link>

<Link onClick={logOut} className='nav-bar-links' to="/logout"> LogOut</Link>

</div>

:
    <Link className='nav-bar-links' to="/login">LogIn</Link>

  }
    </div>


<div className="nav-bar">
  

{signUpErrorMsg ? null
                :<p className="signed-up-msg">Signed Up</p>}
   <Routes>
    <Route path="/" element={<Home showBlogContent={showBlogContent} showBlogData={showBlogData} setShowBlogData={setShowBlogData} showLogInStatus={showLogInStatus} showWelcomeBackMsg={showWelcomeBackMsg} blogNo={blogNo} setsBlogNo = {setBlogNo}/>}></Route>

    <Route path = "/writeBlog" element = {<WriteBlog loggedInEmailId={loggedInEmailId} showLogInStatus={showLogInStatus}/>}></Route> 
    <Route path = "/myProfile" element={<UserProfile updateBlogContent={updateBlogContent} showBlogContent={showBlogContent} loggedInEmailId={loggedInEmailId}/>}></Route>

    <Route path = "/aboutUs" element = {<AboutUs/>}></Route>
    <Route path = "/blog/" element = {<BlogPage  blogNo = {blogNo}/>} ></Route>
    <Route path = "/signUp" element = {<SignUp signUpErrorMsg={signUpErrorMsg} setSignUpErrorMsg={setSignUpErrorMsg}/>}></Route>
    <Route path = "/login" element={<LogIn setShowWelcomeBackMsg={setShowWelcomeBackMsg}  setLogOutButton={setLogOutButton} showLogInStatus={showLogInStatus}  setShowLogInStatus = {setShowLogInStatus}/>}></Route>:
    <Route path = "/logout" element={<LogIn setLogOutButton={setLogOutButton} showLogInStatus={showLogInStatus} setShowLogInStatus = {setShowLogInStatus}/>}></Route>:
  
    <Route path = "/updateYourBlogPage" element = {<UpdateYourBlogPage test={test}/>}></Route>
  
  </Routes>
  </div>

                
</Router>

    </div>
  );
}

export default App;
