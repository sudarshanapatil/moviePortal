const express = require('express');
const json = require('body-parser');
var app = express();
const adminRoute = require('./routes/admin');
const userRoutes = require('./routes/user');

console.log(userRoutes,"routes")
app.use(json());

app.use('/', userRoutes);
app.use('/admin', adminRoute);
module.exports = app;