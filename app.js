const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
var app = express();
const adminRoute = require('./routes/admin');
const userRoutes = require('./routes/user');

// console.log(userRoutes,"routes")
// app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
// app.use(json());
app.use(cors());

app.use('/admin', adminRoute);
app.use('/', userRoutes);
module.exports = app;