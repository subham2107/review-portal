import React from 'react';
import { Link } from 'react-router-dom';
import PopUp from './PopUp';
import SearchBar from './SearchBar';
import './NavBar.css';
import './index.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class NavBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSignedUp: false,
      isPopUp: false,
    };
}

componentDidMount() {
  fetch('/api/users/me').then(user => {
    if (user.status === 200) {
      this.setState({isSignedUp: true});
      console.log('hi');
    }
    else {
      this.setState({isSignedUp: false});
    }
  });
}


onInput = event => {
  this.setState({ [event.target.name]: event.target.value });
}


onLogout = () => {
  fetch('/api/sessions/me', {
    method: 'DELETE'
  }).then(res => {
    if (res.status === 204) {
      console.log('inside logout');
      this.setState({isSignedUp: false});
      window.location.reload();
    }
  });
}

togglePopUp =() => {
  this.setState({isPopUp:!this.state.isPopUp})
}


searchMovieResult = (moviesSearchResult) => {
  this.props.getSearchResult(moviesSearchResult);
}


render() {
  
  let logininfo;
  
  if(this.state.isSignedUp) {
    logininfo=<div onClick={this.onLogout}>Logout</div>
  }
  else{
    logininfo=<div onClick={this.togglePopUp}>Login/Signup</div>
  }

  return (
<header className="navbar">
   <Link to='/'><div className="companyLogo"><b className="logoY">TVdb</b></div></Link>
   {this.props.displaySearch? <div></div>:<SearchBar searchMovieResult={this.searchMovieResult}/>}
   <span className="login-signup">{logininfo}</span>
   {this.state.isPopUp?<PopUp togglePopUp={this.togglePopUp}/>:null}
</header>


    );
  }
}



export default NavBar;