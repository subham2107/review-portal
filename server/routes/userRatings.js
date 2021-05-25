const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const auth = require('../middlewares/auth');

router.post('/:movieId',auth.authenticate, (req, res) => {
  let user_rating = req.body.user_rating;
  let user_review = req.body.user_review;
  let userId = req.session.userId;
  Movie.findOne({ id: req.params.movieId }).then(movie => {
    
    let totalValue = movie.vote_average * movie.vote_count;
    
    let alreadypresentUserId = movie.reviews.some((x) => x.userId == userId);

    if(alreadypresentUserId) {
      let userIndex = movie.reviews.findIndex((a) => a.userId == userId);
      movie.vote_average=((totalValue - movie.reviews[userIndex].rating + user_rating ) / ( movie.vote_count)).toFixed(2);
      movie.reviews.splice( userIndex,1);   
    } else {
      movie.vote_average=((( totalValue ) + user_rating ) / ( movie.vote_count++ )).toFixed(2);
    }
    movie.reviews.push({ userId, rating: user_rating, review:user_review });
    
    movie.save();
    res.send(movie);
  }).catch((e) => {
      console.log(e);
      res.status(500).send({ error: "Internal Server Error" });
  });
});

module.exports = router;