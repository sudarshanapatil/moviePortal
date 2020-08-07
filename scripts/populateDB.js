var uniqid = require('uniqid');
const csv = require('csv-parser');
const fs = require('fs');

var mongoose = require('mongoose');
//For local
 var mongoDB = 'mongodb://127.0.0.1/movieDataset';
//For cloud
// var mongoDB='mongodb+srv://sudarshana:sudri@123@movies.5aua6.mongodb.net/movieDataset?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
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
let results = [];
fs.createReadStream('/home/sudarshana/Desktop/movie_metadata.csv')
	.pipe(csv())
	.on('data', (data) => {
		results.push(data)
	})
	.on('end', async () => {
		results = results.slice(0, 50)
		let movieData = results.map(movieItem => {
			let actors = [];
			let genres = movieItem.genres.split("|");
			if (movieItem['actor_1_name'])
				actors.push(movieItem['actor_1_name']);
			if (movieItem['actor_2_name'])
				actors.push(movieItem['actor_2_name']);
			if (movieItem['actor_3_name'])
				actors.push(movieItem['actor_3_name']);

			return {
				contentId: uniqid(),
				movieName: movieItem['movie_title'],
				director: movieItem['director_name'],
				rating: movieItem['imdb_score'],
				genres: genres,
				releaseYear: movieItem['title_year'],
				actors: actors,
				language: movieItem['language'],
				duration: movieItem['duration'],
			}
		})
		console.log(movieData.length, "movie")
		try {
			await Movie.insertMany(movieData)
			console.log("inserted successfully!");
		} catch (error) {
			console.log("error in inserting");
		}
	})


db.on('error', console.error.bind(console, 'MongoDB connection error:'));




