const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({

    backdrop_path : String,
    first_air_date : String,
    genre_ids : [],
    _id: Number,
    name: String,
    origin_country : [],
    original_language: String,
    original_name: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    vote_average: Number,
    vote_count: Number,
    reviews : [{userId: mongoose.ObjectId, rating: Number, review: String, } ],
    createdAt: {
      type: Date,
      default: Date.now()
  },
    updatedAt: {
      type: Date,
      default: Date.now()
  }    
});

module.exports = mongoose.model('Movie', movieSchema);