const express = require('express');
const json = require('body-parser');
var app = express();
const adminRoute = require('./routes/admin');
const userRoutes = require('./routes/user');

// console.log(userRoutes,"routes")
app.use(json());

app.use('/admin', adminRoute);
app.use('/', userRoutes);
module.exports = app;