const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/', async (req, res) => {
  try {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || "0");
    const totalNoOfMovies = await Movie.countDocuments({});
    const movies = await Movie.find({}).limit(PAGE_SIZE).skip(PAGE_SIZE * page);
    res.json({
      totalPages: Math.ceil(totalNoOfMovies / PAGE_SIZE) - 1,
      movies
    })
  }
  catch(err) {
    console.log (err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get('/:movieId', (req, res) => {
  Movie.findOne({ id: req.params.movieId }).then(movie => {
      res.send(movie);
  }).catch(() => {
      res.status(500).send({ error: "Internal Server Error" });
  });
});

module.exports = router;