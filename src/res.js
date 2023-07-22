<div className='res-nav-bar-links-div-container'>

{
showNavigationMenu &&
<div onClick={hideNavBar} className='res-nav-bar-links-div'>
  <p>Navigation bar</p>

<Link  className="res-nav-bar-links" to="/">Home</Link>
  <Link className="res-nav-bar-links" to="/aboutUs">About Us</Link>
  {/* {
    showLogOut?"":<Link className="res-nav-bar-links" to="/writeBlog">Write Blog</Link>
  } */}
  <Link className="res-nav-bar-links" to="/signUp">Sign Up</Link>
 
  {logOutButton ?

  <Link onClick={logOut} className='res-nav-bar-links' to="/logout">
    LogOut
    </Link>:
      <Link className='res-nav-bar-links' to="/login">LogIn</Link>
    }
  
    <button onClick={hideNavBar}>Close</button>

</div>

}


{
  navToHomePage && <Link to ="/"/>
}

</div>