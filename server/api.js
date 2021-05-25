const express = require('express');
const router = express.Router();

const users = require('./routes/users');
const sessions = require('./routes/sessions');
const movies = require('./routes/movies');
const userRatings = require('./routes/userRatings');

// Add json and urlencoded middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/users', users);

router.use('/sessions', sessions);

router.use('/movies', movies);

router.use('/userRatings', userRatings);

module.exports = router;