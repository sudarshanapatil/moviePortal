var uniqid = require('uniqid');
const csv = require('csv-parser');
const fs = require('fs');

var mongoose = require('mongoose');
//For local
// var mongoDB = 'mongodb://127.0.0.1/movieDataset';
//For cloud
var mongoDB ='mongodb+srv://sudarshana:sudri@123@movies.7cpna.mongodb.net/movies?retryWrites=true&w=majority';
// var mongoDB = 'mongodb+srv://sudarshana:sudri@123@movies.5aua6.mongodb.net/movieDataset?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
var Schema = mongoose.Schema;
const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema); //create collection

async function addAdmin() {
  const adminData = [{
    username: 'sudarshana',
    password: 'YWRtaW4='
  }, {
    username: 'admin',
    password: 'YWRtaW4='
  }]
  try {
    await Admin.insertMany(adminData)
    console.log("inserted successfully Admin data!");
  } catch (error) {
    console.log("error in inserting");
  }
}

addAdmin()
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




