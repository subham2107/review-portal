import React, { Component } from "react";
import './PopUp.css'
import './LoginPage.css'
import LoginPage from './LoginPage.js'
class PopUp extends Component {
  handleClick = () => {
    this.props.togglePopUp();
  }

    render(){
    return(
      
        <div className="popup">
            <div className="popup-inner">
                <button className="close-button" onClick={this.handleClick}><b>X</b></button>
                <LoginPage />          
            </div>
        </div>
        
    )
}
};
export default PopUp;