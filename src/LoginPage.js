import React from 'react';
import './LoginPage.css';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      messageLogin: '',
      messageSignup: ''
    };
  }


  onInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onLoginClick = e => {
    e.preventDefault();
    const { email, password } = this.state;
    fetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    // .then(response => {
    //   console.log(response);
    // })
    // .then(window.location.reload());
    .then((response) => {
      if (response.ok) {
        window.location.reload();
      }
      return response.json().then((body) => {
          throw new Error(body.error)
      })
    })
    .catch((error) => {
      this.errorMessage = error.message
      this.setState({messageSignup: ''});
      this.setState({messageLogin: this.errorMessage});
    });
    
  }

  onSignupClick = e => {
    
    e.preventDefault();
    const { email, password } = this.state;
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }
    ).then((response) => {
      if (response.ok) {
        alert('User Signed Up! You can login now.')
      }
      return response.json().then((body) => {
          throw new Error(body.error)
      })
    })
    .catch((error) => {
      this.errorMessage = error.message
      this.setState({messageSignup: this.errorMessage});
      this.setState({messageLogin: ''});
    });
    
  }

  render() {
    return (
    <div>
    <div className="loginPage" style={{textAlign: 'center'}}>
      <span >LOGIN / SIGNUP</span>
      <br></br>
      {this.state.messageLogin? <span style={{ color: 'red', marginTop: '0'}}>{this.state.messageLogin}</span> : null} 
      {this.state.messageSignup ? <span style={{ color: 'red', marginTop: '0'}}>{this.state.messageSignup}</span> : null}
        <form>
        <div>
          <input className='email-input' placeholder="email" name="email" required type="email" onInput={this.onInput} value={this.state.email}></input>
        </div>
        <div>
          <input className='password-input' placeholder="password" name="password" required type="password" onInput={this.onInput} value={this.state.password}></input>
        </div>
          <div>
            <input className='form-login-btn'  type="submit" onClick={this.onLoginClick} value="Login"></input>
            <input className='form-signup-btn' type="submit" onClick={this.onSignupClick} value="Sign up"></input>
            
          </div>
          
        </form>

      </div> 
  </div>
    );
  }
  
}

export default LoginPage;
