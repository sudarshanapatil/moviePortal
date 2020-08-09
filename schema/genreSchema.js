var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var genreSchema = new Schema({
	genreName: { type: String, required: false },
	id: { type: String, required: true },
});
