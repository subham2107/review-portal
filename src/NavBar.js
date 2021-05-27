import React from 'react';
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import './NavBar.css';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function SearchBar(){
  return (<div className="SearchBar">
    <input className="SearchInput" type="text" placeholder="Search for tv series..."></input>
    <div className="SearchIconWrapper"><img className="SearchIcon" src='/images/search-24px.svg' alt='searchIcon'/></div>
    </div>);
}
class NavBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
}


render() {

let temp = "";
const loggedInUser = localStorage.getItem("user");
let logout;
if (loggedInUser) {
  temp = `Hi, ${loggedInUser}`;
  logout = "Logout"
}
else{
  temp  = "Log-in/Sign-up";
}


  return (
    
      <header className="navbar">
   <Link to='/'><div className="companyLogo"><b className="logoY">TVdb</b></div></Link>
   <SearchBar/>
  {/* <div className="dropdown-nav" ><img className="user-icon" src= "/images/user-login-icon.png"/>
        <div className="dropdown-content">
          <span className = "box" onClick={loginclick}>{temp}</span>
          <span className = "box" onClick = {orderclick}>My orders</span>
          <span className = "box" onClick={logoutclick}>{logout}</span>
          </div>
  </div> */}
  <div>
    <span className="login-signup">Login/Signup</span>
  </div>
</header>
    );
  }
}



export default NavBar;