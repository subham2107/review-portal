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
      totalPages : '',
      pageNumber : '',
      movies: []
  };
  
}


componentDidMount() {
  fetch(`/api/movies?page=0`)
  .then(response => response.json())
  .then(response => {
  //console.log(response.movies);
  this.setState({totalPages: response.totalPages});
  this.setState({movies: response.movies});
  //console.log (response.totalPages)            
  });
}



  render() {
//     const gotoPrevious = () => {
//   setPageNumber(Math.max(0, pageNumber - 1));
// };

// const gotoNext = () => {
//   setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
// };
//     let pages = new Array({this.state.totalPages}).fill(null).map((v, i) => i);
    return (
      <div className="HomePage">
        <div style={{minHeight: "calc(100vh - 31px)"}}>
        {/* <NavBar/> */}
        <Banner/>
        <br></br>
        {(this.state.movies).map((eachMovie) => (
        <div className="MovieList">
          <img  src={eachMovie.poster_path} alt={eachMovie.original_name} />
          <h2>Title: {(eachMovie.original_name)}</h2>
          <h4>Rating: {(eachMovie.vote_average)}</h4>
          <Link  to={`/movies/${(eachMovie.id)}`}>
              <h3 style={{cursor: 'pointer', color: 'yellow'}}>Details</h3>
          </Link>
        </div>
        ))}
        </div>
        <hr className="footer-hr"/>
        <Footer/>
      </div>
    );
  }
}

export default HomePage;