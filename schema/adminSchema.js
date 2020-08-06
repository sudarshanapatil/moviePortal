var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminSchema = new Schema({
    userName: { type: String, required: false },
    password: { type: String, required: true },

})
