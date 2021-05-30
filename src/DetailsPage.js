import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import './DetailsPage.css';
import './HomePage.css';
import axios from 'axios';
import PopUp from './PopUp';


class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      user_rating: '',
      user_review: '',
      message: '',
      trailer_key: '',
      cast: [{name:'',image:''}],
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
  fetch(`/api/movies/${this.props.match.params.movieId}`)
  .then(response => response.json())
  .then(response => {
  console.log(response);
  this.setState({movie: response});
  //console.log (response.totalPages)            
  })
  .catch((err) =>{
    console.log(err)
  })
  const promiseVideo = axios(`https://api.themoviedb.org/3/tv/${this.props.match.params.movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
  const promiseCredits = axios(`https://api.themoviedb.org/3/tv/${this.props.match.params.movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
  Promise.all([promiseVideo, promiseCredits])
      .then((responses) => {
          console.log(responses[0].data.results);
          console.log(responses[1].data.cast);
            for(let i=0;i<responses[0].data.results.length;i++) {
                if(responses[0].data.results[i].type=='Trailer') {
                   this.setState({trailer_key: responses[0].data.results[i].key}); 
                   console.log('hello'+this.state.trailer_key);
                   break;   
                }

            }

            //for(let i=0;i<responses[1].data.cast.length;i++) {
              //if(responses[1].data.cast[i].known_for_department=='Acting') {
                 //this.setState({cast: responses[1].data.cast}); 
                //  for(let i=0;i<responses[1].data.cast.length;i++) {
                //   //this.setState({cast: responses[0].data.results[i].key}); 
                //   this.state.cast.push({name: this.state.cast[i].name,image: this.state.cast[i].profile_path});
                //   console.log(this.state.cast[i].name);  
                //   console.log(this.state.cast[i].profile_path);

                //  }
                 //console.log('helloooooo'+ responses[1].data);
                  
              //}

          //}

          });

 
}


togglePopUp =() => {
  this.setState({isPopUp:!this.state.isPopUp})
}


onInput = event => {
  this.setState({ [event.target.name]: event.target.value });
}

reviewClick = (e) => {
  //e.preventDefault();
  console.log('reviewClick func')
  if(this.state.user_rating && this.state.user_review) {

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
        console.log(res.status);
        window.location.reload();
      }
    })
    .catch((error) => {
        this.errorMessage = error.message
        this.setState({message: this.errorMessage});
      });
  }
  else {
    alert('Please enter both review and rating')
  }
  }



  render() {
    //console.log((this.state.movieId));
    let myButton;
    if(this.state.isSignedUp==false) {
      myButton = <button className="submitBtn" onClick={this.togglePopUp}><b>POST</b></button>
    }
    else {
      myButton = <button className="submitBtn" onClick={this.reviewClick}><b>POST</b></button>
    }

    
    return (
      <div>

        <div style={{minHeight: "calc(100vh - 31px)"}}>
        <NavBar displaySearch='false'/>
        
        
        <div className="DetailPage"  >
          <div className="detail-column1">
          <h1>{(this.state.movie.name)}</h1>
          <iframe className='video' src={`https://www.youtube.com/embed/${this.state.trailer_key}`} allowFullScreen="allowFullScreen" frameBorder="0"></iframe>
          {/* <img  src={`${this.state.movie.backdrop_path}`} alt={this.state.movie.original_name} /> */}
          
          <p><b>Release Date: </b>{(this.state.movie.first_air_date)}</p>
          <p><b>Average Rating: </b>{(this.state.movie.vote_average)} <svg width="13" height="13" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="yellow" ><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg></p>
          <p><b>Rating Count: </b> {(this.state.movie.vote_count)}</p>
          <form>
          <div>
          
          <label>Give rating & review </label><select value={this.state.user_rating} onChange={this.onInput} name="user_rating">
                    <option value="select">select</option>
                    <option value="10">10</option>
                    <option value="9">9</option>
                    <option value="8">8</option>
                    <option value="7">7</option>
                    <option value="6">6</option>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>       
          </select>
          
          
            
                        
          </div>
          <textarea className='userReview' name="user_review" onInput={this.onInput} value={this.state.user_review} placeholder="Write a review..." maxlength='240' required="required"></textarea>

          {/* <div>
            <input type="number" name="user_rating" onInput={this.onInput} value={this.state.user_rating} placeholder="1-10"  ></input>
          </div> */}
           
          
          
          
            {this.state.isPopUp?<PopUp togglePopUp={this.togglePopUp}/>:null}
          
          </form>
          {myButton}
          <p><b>Overview: </b>{(this.state.movie.overview)}</p>
          </div>
          {this.state.movie.reviews?
          
          <div className="detail-column2">
          <h3>Reviews & Ratings: </h3>
          {(this.state.movie.reviews).slice(0).reverse().map((eachReview) => (
          <div className='review-rating' >
          {/* {(eachReview.review)||(eachReview.rating)?<li>Review: {(eachReview.review)} </li>:null}
          {(eachReview.review)||(eachReview.rating)?<span> Rating: {(eachReview.rating)}</span>:null} */}
          <li>{(eachReview.rating)} <svg width="13" height="13" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="yellow" ><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg> , {(eachReview.review)}  </li>
          
          </div>
          
          ))}</div>
          :null}
          {/* {this.state.cast?
          <div>
          {(this.state.cast).map((eachCast) => (
          <div style={{display: 'flex'}}>
          <span> Name: {(eachCast.name)}</span>
          <span> Photo: {(eachCast.profile_path)}</span>
          </div>
          
          ))}</div>:null} */}
          {/* <h4>Name: {(this.state.cast.name)}</h4> */}
        </div>
        
        </div>
        <hr className="footer-hr"/>
        <Footer/>
      </div>
    );
  }
}

export default DetailsPage;