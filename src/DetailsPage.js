import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import './HomePage.css';
import axios from 'axios';


class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      user_rating: '',
      user_review: '',
      message: ''
      
  };
  
}


componentDidMount() {
  fetch(`/api/movies/${this.props.match.params.movieId}`)
  .then(response => response.json())
  .then(response => {
  //console.log(response);
  this.setState({movie: response});
  //console.log (response.totalPages)            
  })
  .catch((err) =>{
    console.log(err)
  })
}


onInput = event => {
  this.setState({ [event.target.name]: event.target.value });
}

reviewClick = () => {
  
  console.log('reviewClick func')
  const { user_review, user_rating, message } = this.state;
  console.log(this.state)
  fetch(`/api/userRatings/${this.props.match.params.movieId}`, {
      method: 'POST',
      body: JSON.stringify({ user_review, user_rating, message}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => {
      if (res.status === 200) {
        //console.log(res.status);
        window.location.reload();
      }
    })
    .catch((error) => {
        this.errorMessage = error.message
        this.setState({message: this.errorMessage});
      });
  }



  render() {
    //console.log((this.state.movieId));
    return (
      <div className="HomePage">

        <div style={{minHeight: "calc(100vh - 31px)"}}>
        <NavBar/>
        
        
        <div className="MovieList">
          <iframe width="715px" height="400px"src="https://www.youtube.com/embed/8ctRjR_DWAg"></iframe>
          {/* <img  src={`${this.state.movie.backdrop_path}`} alt={this.state.movie.original_name} /> */}
          <h2>Title: {(this.state.movie.name)}</h2>
          <h4>Average Rating: {(this.state.movie.vote_average)}</h4>
          <h4>Rating Count: {(this.state.movie.vote_count)}</h4>
          {/* <div>
          <select id="user-rating">
              <option value="select" >select</option>
              <option name="user_rating" onInput={this.onInput} value={this.state.user_rating}>1</option>
              <option name="user_rating" onInput={this.onInput} value={this.state.user_rating}>2</option>
              <option name="user_rating" onInput={this.onInput} value={this.state.user_rating}>3</option>
              <option name="user_rating" onInput={this.onInput} value={this.state.user_rating}>4</option>
              <option name="user_rating" onInput={this.onInput} value={this.state.user_rating}>5</option>
              <option name="user_rating" onInput={this.onInput} value={this.state.user_rating}>6</option>
              <option name="user_rating" onInput={this.onInput} value={this.state.user_rating}>7</option>
              <option name="user_rating" onInput={this.onInput} value={this.state.user_rating}>8</option>
              <option name="user_rating" onInput={this.onInput} value={this.state.user_rating}>9</option>
              <option name="user_rating" onInput={this.onInput} value={this.state.user_rating}>10</option>
            </select>
            <select value={this.state.value} onChange={this.onInput} name=“value”>
                    <option value=“1">1</option>
                    <option value=“2”>2</option>
                    <option value=“3">3</option>
                    <option value=“4”>4</option>
                    <option value=“5">5</option>
                    </select>
          </div> */}
          <div>
            <input type="number" name="user_rating" onInput={this.onInput} value={this.state.user_rating} placeholder="1-10"  ></input>
          </div>
          <div>
            <textarea name="user_review" onInput={this.onInput} value={this.state.user_review} placeholder="Write a review..."  ></textarea>
            <button onClick={this.reviewClick} value="Review it">Review ittt</button>
          </div>
          
          {this.state.movie.reviews?
          
          <div>
          <h4>Reviews & Ratings: </h4>
          {(this.state.movie.reviews).map((eachReview) => (
            <div style={{display: 'flex'}}>
          <li>{(eachReview.review)}, </li>
          <span> Rating: {(eachReview.rating)}</span>
          
          </div>
          
          ))}</div>:null}
          <h4>Overview: {(this.state.movie.overview)}</h4>
        </div>
        
        </div>
        <hr className="footer-hr"/>
        <Footer/>
      </div>
    );
  }
}

export default DetailsPage;