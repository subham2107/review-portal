import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Banner from './Banner';
import Footer from './Footer';
import MovieList from './MovieList';
import './HomePage.css';





class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages : '',
      pageNumber : '',
      movies: [],
      zeroSearchResult: false
  };
  
}


componentDidMount() {
  //console.log(window.location)
  fetch(`/api/movies?page=0`)
  .then(response => response.json())
  .then(response => {
  //console.log(response.movies);
  this.setState({totalPages: response.totalPages});
  this.setState({movies: response.movies});
  //console.log (response.movies)            
  });
}

getSearchResult = (moviesSearchResult) => {
  if(moviesSearchResult.length>0) {
    this.setState({movies:moviesSearchResult})
  }
  else {
    //this.componentDidMount();
    this.setState({zeroSearchResult:true})
    
  }

}



  render() {
//     const gotoPrevious = () => {
//   setPageNumber(Math.max(0, pageNumber - 1));
// };

// const gotoNext = () => {
//   setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
// };
//     let pages = new Array({this.state.totalPages}).fill(null).map((v, i) => i);
//console.log(this.state.movies);
    return (

      <div className="HomePage">
        <div style={{minHeight: "calc(100vh - 31px)"}}>
        <NavBar getSearchResult = {this.getSearchResult}/>
        <Banner/>
        <br></br>
        {this.state.zeroSearchResult==false? 
        <MovieList movies={this.state.movies}/>
        :<div class="zeroMovieSearchResult"><img className="unsuccessfullSearchIcon" src="images/icons8-nothing-found-48.png"></img>
        <div>Sorry, we couldn't find any matching results...</div>
        </div>}
        </div>
        <hr className="footer-hr"/>
        <Footer/>
      </div>
    );
  }
}

export default HomePage;