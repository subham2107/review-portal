import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import Footer from './Footer';
import './HomePage.css';

// import NavBar from './NavBar';



class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
  };
  
}


componentDidMount() {
  fetch(`/api/movies/${this.props.match.params.movieId}`)
  .then(response => response.json())
  .then(response => {
  //console.log(response.reviews[0].review);
  this.setState({movie: response});
  //console.log (response.totalPages)            
  });
}



  render() {
    return (
      <div className="HomePage">

        <div style={{minHeight: "calc(100vh - 31px)"}}>
        {/* <NavBar/> */}
        <br></br>
        
        <div className="MovieList">
          <img  src={`${this.state.movie.poster_path}`} alt={this.state.movie.original_name} />
          <h2>Title: {(this.state.movie.original_name)}</h2>
          <h4>Average Rating: {(this.state.movie.vote_average)}</h4>
          <h4>Rating Count: {(this.state.movie.vote_count)}</h4>
          {this.state.movie.reviews?
          
          <div>
          <h4>Reviews: </h4>
          {(this.state.movie.reviews).map((eachReview) => (
          <li>{(eachReview.review)}</li>
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

export default HomePage;