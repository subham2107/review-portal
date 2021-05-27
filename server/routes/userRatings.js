const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const auth = require('../middlewares/auth');

router.post('/:movieId',auth.authenticate, (req, res) => {
  let user_rating = parseInt(req.body.user_rating);
  //console.log(user_rating);console.log(typeof(user_rating));
  //console.log(req.body.user_rating);console.log(typeof(req.body.user_rating));
  let user_review = req.body.user_review;
  let userId = req.session.userId;
  //console.log('pppppppppppppppppp')
  console.log(req.body)
  Movie.findOne({ _id: req.params.movieId }).then(movie => {
    //console.log(movie.vote_average * movie.vote_count);console.log(typeof(movie.vote_average * movie.vote_count));
    let totalValue = (movie.vote_average * movie.vote_count);
    console.log('total withot change'+totalValue);
    totalValue = Math.trunc((movie.vote_average * movie.vote_count) * 100) / 100;
    console.log('total with change'+totalValue);
    // console.log(totalValue);
    // totalValue = Math.round(totalValue);
    // console.log(totalValue);
    // totalValue = totalValue.toFixed(2);
    
    //console.log(movie.vote_average * movie.vote_count);console.log(typeof(movie.vote_average * movie.vote_count));
    let alreadypresentUserId = movie.reviews.some((x) => x.userId == userId);

    if(alreadypresentUserId) {
      let userIndex = movie.reviews.findIndex((a) => a.userId == userId);
      
      console.log('already rating'+ movie.reviews[userIndex].rating);
      console.log('user-input' + user_rating);
      movie.vote_average=((totalValue - movie.reviews[userIndex].rating + user_rating ) / ( movie.vote_count));
      //console.log('avg inside presentAlready')
    //console.log(typeof(movie.vote_average));
      movie.reviews.splice( userIndex,1);   
    } else {
      movie.vote_count = movie.vote_count + 1;
      movie.vote_average=(( totalValue  + user_rating ) / ( movie.vote_count ));
    }
    console.log('avg without change'+movie.vote_average);
    movie.vote_average=Math.trunc(movie.vote_average * 100) / 100;
    console.log('avg with change'+movie.vote_average);
    movie.reviews.push({ userId, rating: user_rating, review:user_review });
    movie.reviews.reverse();
    movie.save();
    //console.log('avg')
    //console.log(movie.vote_average);
    res.send(movie);
  }).catch((e) => {
      console.log(e);
      res.status(500).send({ error: "Internal Server Error" });
  });
});

module.exports = router;