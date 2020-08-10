const mongoose = require('mongoose');
const app = require('./app')
const conf = require('./conf/development.json');
const { api, mongo } = conf;
const API_SERVER_PORT = api.port || process.env.port;;

const DB_URI = `mongodb://${mongo.host}:${mongo.port}/${mongo.db}`;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to mongo');
  app.listen(API_SERVER_PORT, () => {
    console.log('Server started on port', API_SERVER_PORT);
  });
});