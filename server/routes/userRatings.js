const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const auth = require('../middlewares/auth');

router.post('/:movieId',auth.authenticate, (req, res) => {
  let user_rating = req.body.user_rating;
  let user_review = req.body.user_review;
  let userId = req.session.userId;
  Movie.findOne({ id: req.params.movieId }).then(movie => {
    
    movie.vote_average=((( movie.vote_average * movie.vote_count) + user_rating ) / ( movie.vote_count++ )).toFixed(2);
    
    let alreadypresentUserId = movie.reviews.some((x) => x.userId == userId);
    if(alreadypresentUserId) {
      movie.reviews.splice(movie.reviews.findIndex((a) => a.userId == userId),1);   
    }
    movie.reviews.push({ userId , review:user_review });
    movie.save();
    res.send(movie);
  }).catch(() => {
      res.status(500).send({ error: "Internal Server Error" });
  });
});

module.exports = router;