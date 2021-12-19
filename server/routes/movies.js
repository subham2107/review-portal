const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', async (req, res) => {
  try {
    const PAGE_SIZE = 30;
    const page = parseInt(req.query.page || "0");
    const totalNoOfMovies = await Movie.countDocuments({});
    const movies = await Movie.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * page);
    res.json({
      totalPages: Math.ceil(totalNoOfMovies / PAGE_SIZE),
      movies
    })
  }
  catch(err) {
    //console.log (err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get('/search/:movieName', (req,res) => {
console.log(req.params.movieName);
const regex =  new RegExp(`${req.params.movieName}`,'i');
console.log(regex);
  Movie.find({name : regex }).then(
    movie => {
      //console.log(movie);
      res.status(200).send(movie);
      return;
    }
  ).catch(() => {
    res.status(404).send({ error: "Movie not found" });
});
});

router.get('/:movieId', (req, res) => {
  //console.log('movie'+req.params.movieId)
  //console.log(req.body)
  Movie.findOne({ _id: req.params.movieId }).then(movie => {
      res.send(movie);
  }).catch(() => {
      res.status(500).send({ error: "Internal Server Error" });
  });
});

module.exports = router;