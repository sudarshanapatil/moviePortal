var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var movieSchema = new Schema({
    contentId: { type: String, required: false },
    movieName: { type: String, required: true },
    director: { type: String },
    rating: { type: String },
    genres: { type: Array },
    releaseYear: { type: String },
    actors: { type: Array },
    language: { type: String },
    duration: { type: String },

})
var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;