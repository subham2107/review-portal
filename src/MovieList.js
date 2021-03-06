import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Banner from './Banner';
import Footer from './Footer';
import './HomePage.css';

function MovieList(props) {
  let movielist = [];
    if(props.movies){
        movielist = props.movies;
    }
 // console.log(props.movies);
return(

<div className="homePageMovies" >
        {(movielist).map((eachMovie) => (
        <Link  to={`/movies/${(eachMovie._id)}`}>
        <div className="eachMovieDiv">
          <div>
          <img className="poster" src={eachMovie.poster_path} alt={eachMovie.name} />
          <h4>Title: {(eachMovie.name)}</h4>
          <h5>Rating: {(eachMovie.vote_average)} <svg width="13" height="13" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="yellow" ><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg></h5>
          <h5>Rate Count: {(eachMovie.vote_count)}</h5>
          <h5>Release Date: {(eachMovie.first_air_date)}</h5>
          </div>
          
        </div>
        </Link>
        ))}
        </div>
);
}
export default MovieList;